"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/hooks/use-auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            FileSure
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-muted-foreground">
                    ({user.credits} credits)
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
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
