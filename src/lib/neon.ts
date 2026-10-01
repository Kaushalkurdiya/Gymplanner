// import { createAuthClient } from "@neondatabase/neon-js/auth";
// import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";

// export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL, {
//   adapter: BetterAuthReactAdapter(),
// });
import { createClient } from '@neondatabase/neon-js';
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters';

export const authClient = createClient({
  auth: {
    url: import.meta.env.VITE_NEON_AUTH_URL,
    adapter: BetterAuthReactAdapter(),
  },
});
