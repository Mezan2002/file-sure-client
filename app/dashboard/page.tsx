"use client";

import { PurchaseButton } from "@/components/dashboard/purchase-button";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { ReferralsTable } from "@/components/dashboard/referrals-table";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats, useReferrals } from "@/lib/hooks/use-dashboard";
import { useAuthStore } from "@/lib/store/auth-store";
import { CheckCircle, Gift, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: referrals, isLoading: referralsLoading } = useReferrals();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

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
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your referrals and credits
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Referrals"
          value={stats?.totalReferredUsers ?? 0}
          icon={Users}
          description="Users you've referred"
        />
        <StatsCard
          title="Converted Users"
          value={stats?.convertedUsers ?? 0}
          icon={CheckCircle}
          description="Users who purchased"
        />
        <StatsCard
          title="Credits Earned"
          value={stats?.totalCreditsEarned ?? 0}
          icon={Gift}
          description="From referral conversions"
        />
        <StatsCard
          title="Total Credits"
          value={stats?.currentCredits ?? 0}
          icon={Wallet}
          description="Your current balance"
        />
      </div>

      {!user.hasPurchased && (
        <PurchaseButton hasPurchased={user.hasPurchased} />
      )}

      {stats?.referralLink && <ReferralLink link={stats.referralLink} />}

      {referrals && <ReferralsTable referrals={referrals} />}
    </div>
  );
}
