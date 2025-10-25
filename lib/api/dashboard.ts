import type { DashboardStats, Referral } from "@/types";
import { apiClient } from "./client";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<{
      success: boolean;
      data: DashboardStats;
    }>("/dashboard/stats");
    return response.data.data;
  },

  getReferrals: async (): Promise<Referral[]> => {
    const response = await apiClient.get<{
      success: boolean;
      data: Referral[];
    }>("/dashboard/referrals");
    return response.data.data;
  },
};
