"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout, useProfile } from "@/lib/hooks/use-auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { LayoutDashboard, LogOut, Menu, User, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();
  const isDashboard = pathname === "/dashboard";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useProfile(isDashboard);

  const handleLogout = () => {
    if (!isPending) {
      logout();
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-primary"
            onClick={closeMobileMenu}
          >
            FileSure
          </Link>

          {!isHydrated ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20 md:w-32" />
              <Skeleton className="h-8 w-16 md:w-20" />
            </div>
          ) : (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4" />
                      <span className="font-medium hidden lg:inline">
                        {user.name}
                      </span>
                      <span className="text-muted-foreground">
                        ({user.credits} credits)
                      </span>
                    </div>

                    {!isDashboard && (
                      <Link href="/dashboard">
                        <Button variant="default" size="sm">
                          <LayoutDashboard className="h-4 w-4 lg:mr-2" />
                          <span className="hidden lg:inline">Dashboard</span>
                        </Button>
                      </Link>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      disabled={isPending}
                    >
                      <LogOut className="h-4 w-4 lg:mr-2" />
                      <span className="hidden lg:inline">
                        {isPending ? "Logging out..." : "Logout"}
                      </span>
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

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center gap-2">
                {isAuthenticated && user && (
                  <div className="flex items-center gap-1 text-xs">
                    <Wallet className="h-3 w-3" />
                    <span className="font-medium">{user.credits}</span>
                  </div>
                )}

                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                    <SheetHeader>
                      <SheetTitle className="text-left">Menu</SheetTitle>
                      <SheetDescription className="text-left">
                        {isAuthenticated && user
                          ? `Welcome, ${user.name}`
                          : "Welcome to FileSure"}
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-4 mt-6">
                      {isAuthenticated && user ? (
                        <>
                          {/* User Info Card */}
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-primary" />
                              <span className="font-medium text-sm">
                                {user.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Wallet className="h-4 w-4" />
                              <span>{user.credits} Credits</span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              {user.email}
                            </div>
                          </div>

                          {/* Navigation Links */}
                          {!isDashboard && (
                            <Link
                              href="/dashboard"
                              onClick={closeMobileMenu}
                              className="w-full"
                            >
                              <Button
                                variant="default"
                                className="w-full justify-start"
                              >
                                <LayoutDashboard className="h-4 w-4 mr-2" />
                                Dashboard
                              </Button>
                            </Link>
                          )}

                          <Link
                            href="/"
                            onClick={closeMobileMenu}
                            className="w-full"
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                            >
                              Home
                            </Button>
                          </Link>

                          <div className="border-t pt-4 mt-2">
                            <Button
                              variant="destructive"
                              className="w-full justify-start"
                              onClick={handleLogout}
                              disabled={isPending}
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              {isPending ? "Logging out..." : "Logout"}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            onClick={closeMobileMenu}
                            className="w-full"
                          >
                            <Button variant="outline" className="w-full">
                              Login
                            </Button>
                          </Link>
                          <Link
                            href="/register"
                            onClick={closeMobileMenu}
                            className="w-full"
                          >
                            <Button className="w-full">Get Started</Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
