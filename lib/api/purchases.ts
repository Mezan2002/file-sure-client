import type { CreatePurchaseInput, Purchase } from "@/types";
import { apiClient } from "./client";

export const purchasesApi = {
  createPurchase: async (data: CreatePurchaseInput): Promise<Purchase> => {
    const response = await apiClient.post<{ success: boolean; data: Purchase }>(
      "/purchases",
      data
    );
    return response.data.data;
  },

  getUserPurchases: async (): Promise<Purchase[]> => {
    const response = await apiClient.get<{
      success: boolean;
      data: Purchase[];
    }>("/purchases");
    return response.data.data;
  },
};
