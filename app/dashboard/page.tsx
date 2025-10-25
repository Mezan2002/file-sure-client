"use client";

import { PurchaseButton } from "@/components/dashboard/purchase-button";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { ReferralsTable } from "@/components/dashboard/referrals-table";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats, useReferrals } from "@/lib/hooks/use-dashboard";
import { useAuthStore } from "@/lib/store/auth-store";
import { motion } from "framer-motion";
import { CheckCircle, Gift, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useDashboardStats(true);
  const { data: referrals, isLoading: referralsLoading } = useReferrals(true);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (statsLoading || referralsLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your referrals and credits
          </p>
        </div>
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-2 w-2 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span>Auto-refresh enabled</span>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Referrals"
          value={stats?.totalReferredUsers ?? 0}
          icon={Users}
          description="Users you've referred"
          delay={0}
        />
        <StatsCard
          title="Converted Users"
          value={stats?.convertedUsers ?? 0}
          icon={CheckCircle}
          description="Users who purchased"
          delay={0.1}
        />
        <StatsCard
          title="Credits Earned"
          value={stats?.totalCreditsEarned ?? 0}
          icon={Gift}
          description="From referral conversions"
          delay={0.2}
        />
        <StatsCard
          title="Total Credits"
          value={stats?.currentCredits ?? 0}
          icon={Wallet}
          description="Your current balance"
          delay={0.3}
        />
      </div>

      <PurchaseButton />

      {stats?.referralLink && <ReferralLink link={stats.referralLink} />}

      {referrals && <ReferralsTable referrals={referrals} />}
    </div>
  );
}
