import { purchasesApi } from "@/lib/api/purchases";
import { useAuthStore } from "@/lib/store/auth-store";
import { ApiResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  const setPurchased = useAuthStore((state) => state.setPurchased);

  return useMutation({
    mutationFn: purchasesApi.createPurchase,
    onSuccess: (data) => {
      setPurchased(true);

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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["purchases"],
    queryFn: purchasesApi.getUserPurchases,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};
