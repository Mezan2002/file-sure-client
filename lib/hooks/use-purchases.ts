import { purchasesApi } from "@/lib/api/purchases";
import { ApiResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchasesApi.createPurchase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast.success("Purchase Successful!", {
        description: data.isFirstPurchase
          ? "You earned 2 credits! 🎉"
          : "Purchase completed successfully",
      });
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error("Error", {
        description: error.response?.data?.message || "Purchase failed",
      });
    },
  });
};

export const useUserPurchases = () => {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: purchasesApi.getUserPurchases,
  });
};
