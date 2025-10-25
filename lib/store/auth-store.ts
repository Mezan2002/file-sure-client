import type { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  hasPurchased: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setHydrated: () => void;
  setPurchased: (purchased: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      hasPurchased: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          hasPurchased: user?.hasPurchased || false,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          hasPurchased: false,
        }),
      setHydrated: () => set({ isHydrated: true }),
      setPurchased: (purchased: boolean) => set({ hasPurchased: purchased }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
