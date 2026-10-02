import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { TrainingPlan, User, UserProfile } from "../types";
import { authClient } from "../lib/neon";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const neonUser = session?.user ?? null;
  const isLoading = isPending;

  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    if (!isLoading) {
      if (neonUser?.id) {
        refreshData();
      } else {
        setPlan(null);
      }
    }
  }, [neonUser?.id, isLoading]);

  // refreshData memoize
  const refreshData = useCallback(async () => {
    if (!neonUser || isRefreshingRef.current) return;

    isRefreshingRef.current = true;

    try {
      // Fetch profile
      // const profileData =

      // Fetch Plan
      const planData = await api.getCurrentPlan(neonUser.id).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [neonUser?.id]);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
    await refreshData();
  }

  async function generatePlan() {
    if (!neonUser) {
      throw new Error("User must be authenticated to generate plan");
    }

    await api.generatePlan(neonUser.id);
    await refreshData();
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
