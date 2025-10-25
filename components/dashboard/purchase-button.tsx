"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreatePurchase } from "@/lib/hooks/use-purchases";
import { useAuthStore } from "@/lib/store/auth-store";
import { ShoppingCart } from "lucide-react";

export function PurchaseButton() {
  const { mutate: createPurchase, isPending } = useCreatePurchase();
  const hasPurchased = useAuthStore((state) => state.hasPurchased);

  const handlePurchase = () => {
    createPurchase({
      productId: "PROD001",
      productName: "Premium E-Book",
      amount: 29.99,
    });
  };

  // ✅ Check purchase status from store - persisted in localStorage
  if (hasPurchased) {
    return null;
  }

  return (
    <Card className="border-primary bg-primary/5">
      <CardHeader>
        <CardTitle>Make Your First Purchase</CardTitle>
        <CardDescription>
          Complete your first purchase to earn 2 credits!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handlePurchase}
          disabled={isPending} // ✅ Disabled only while processing
          className="w-full"
          size="lg"
        >
          {isPending ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Premium E-Book - $29.99
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
