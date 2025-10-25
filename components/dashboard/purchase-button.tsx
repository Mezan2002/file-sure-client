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
import { motion } from "framer-motion";
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

  if (hasPurchased) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card className="border-primary bg-primary/5">
        <CardHeader>
          <CardTitle>Make Your First Purchase</CardTitle>
          <CardDescription>
            Complete your first purchase to earn 2 credits!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handlePurchase}
              disabled={isPending}
              className="w-full"
              size="lg"
            >
              {isPending ? (
                <>
                  <motion.div
                    className="mr-2 h-4 w-4 rounded-full border-2 border-background border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: [0, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                  </motion.div>
                  Buy Premium E-Book - $29.99
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
