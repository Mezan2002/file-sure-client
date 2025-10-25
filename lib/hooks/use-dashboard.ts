import { dashboardApi } from "@/lib/api/dashboard";
import { useAuthStore } from "@/lib/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = (enablePolling = false) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardApi.getStats,
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    refetchInterval: enablePolling ? 30 * 1000 : false,
    refetchIntervalInBackground: false,
  });
};

export const useReferrals = (enablePolling = false) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["referrals"],
    queryFn: dashboardApi.getReferrals,
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    refetchInterval: enablePolling ? 30 * 1000 : false,
    refetchIntervalInBackground: false,
  });
};
