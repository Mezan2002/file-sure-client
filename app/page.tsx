"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Gift, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <motion.div
        className="text-center px-4 space-y-8 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to <span className="text-primary">FileSure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our referral program and earn credits for every friend you
            bring!
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: Users,
              title: "Refer Friends",
              description:
                "Share your unique referral link with friends and family",
              delay: 0.6,
            },
            {
              icon: TrendingUp,
              title: "They Purchase",
              description:
                "When your referrals make their first purchase, you both earn credits",
              delay: 0.7,
            },
            {
              icon: Gift,
              title: "Earn Credits",
              description:
                "Get 2 credits for each successful referral conversion",
              delay: 0.8,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: feature.delay + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <feature.icon className="h-12 w-12 text-primary mx-auto" />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
