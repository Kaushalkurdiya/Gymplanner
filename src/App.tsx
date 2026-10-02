import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import type { ReactNode } from "react";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Navbar from "./components/layout/Navbar";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/neon";
import AuthProvider from "./context/AuthContext";

function Providers({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      defaultTheme="dark"
      navigate={navigate}
      replace={(href: string) => navigate(href, { replace: true })}
      <Link to={href} className={className}>
      {children}
    </Link>
    >
      {children}
    </NeonAuthUIProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/:pathname" element={<Auth />} />
                <Route path="/account/:pathname" element={<Account />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
