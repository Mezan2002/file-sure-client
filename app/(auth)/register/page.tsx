"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/store/auth-store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center">
        <Skeleton className="h-[500px] w-[450px]" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton className="h-[500px] w-[450px]" />}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-w-full md:min-w-7xl flex items-center justify-center">
          <RegisterForm />
        </div>
      </motion.div>
    </Suspense>
  );
}
