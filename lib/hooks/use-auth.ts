import { toast } from "@/hooks/use-toast";
import { authApi } from "@/lib/api/auth";
import { removeAuthToken } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.data.user);
      toast({
        title: "Success",
        description: "Registration successful!",
      });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Registration failed",
        variant: "destructive",
      });
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
      toast({
        title: "Success",
        description: "Login successful!",
      });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Login failed",
        variant: "destructive",
      });
    },
  });
};

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    retry: false,
    onSuccess: (data) => {
      setUser(data);
    },
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
      router.push("/");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
  });
};
