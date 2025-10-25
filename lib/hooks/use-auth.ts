import { authApi } from "@/lib/api/auth";
import { removeAuthToken } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { ApiResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.data.user);
      toast.success("Registration successful!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.data.user);
      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export const useProfile = (enablePolling = false) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setPurchased = useAuthStore((state) => state.setPurchased);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await authApi.getProfile();
      setUser(data);
      setPurchased(data.hasPurchased);
      return data;
    },
    retry: false,
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    refetchInterval: enablePolling ? 30 * 1000 : false,
    refetchIntervalInBackground: false,
  });
};

export const useLogout = () => {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      removeAuthToken();
      queryClient.clear();
      router.push("/login");
      setTimeout(() => {
        toast.success("Logged out successfully");
      }, 100);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
    },
  });
};
