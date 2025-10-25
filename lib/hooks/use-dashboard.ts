import { dashboardApi } from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardApi.getStats,
  });
};

export const useReferrals = () => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: dashboardApi.getReferrals,
  });
};
