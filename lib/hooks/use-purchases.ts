import { toast } from "@/hooks/use-toast";
import { purchasesApi } from "@/lib/api/purchases";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchasesApi.createPurchase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast({
        title: "Purchase Successful!",
        description: data.isFirstPurchase
          ? "You earned 2 credits! 🎉"
          : "Purchase completed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Purchase failed",
        variant: "destructive",
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
