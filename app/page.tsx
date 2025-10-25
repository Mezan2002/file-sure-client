import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to <span className="text-primary">FileSure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our referral program and earn credits for every friend you
            bring!
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto" />
              <CardTitle>Refer Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share your unique referral link with friends and family
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mx-auto" />
              <CardTitle>They Purchase</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                When your referrals make their first purchase, you both earn
                credits
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Gift className="h-12 w-12 text-primary mx-auto" />
              <CardTitle>Earn Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get 2 credits for each successful referral conversion
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
