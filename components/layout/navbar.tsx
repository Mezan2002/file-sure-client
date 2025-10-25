"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout, useProfile } from "@/lib/hooks/use-auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();
  const isDashboard = pathname === "/dashboard";

  useProfile(isDashboard);

  const handleLogout = () => {
    if (!isPending) {
      logout();
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            FileSure
          </Link>

          <div className="flex items-center gap-4">
            {!isHydrated ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
            ) : isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-muted-foreground">
                    ({user.credits} credits)
                  </span>
                </div>

                {!isDashboard && (
                  <Link href="/dashboard">
                    <Button variant="default" size="sm">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isPending}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
