"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/store/auth-store";
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
      <RegisterForm />
    </Suspense>
  );
}
