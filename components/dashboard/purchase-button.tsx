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
import { ShoppingCart } from "lucide-react";

interface PurchaseButtonProps {
  hasPurchased: boolean;
}

export function PurchaseButton({ hasPurchased }: PurchaseButtonProps) {
  const { mutate: createPurchase, isPending } = useCreatePurchase();

  const handlePurchase = () => {
    createPurchase({
      productId: "PROD001",
      productName: "Premium E-Book",
      amount: 29.99,
    });
  };

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
          disabled={isPending}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isPending ? "Processing..." : "Buy Premium E-Book - $29.99"}
        </Button>
      </CardContent>
    </Card>
  );
}
