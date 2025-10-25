"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import type { Referral } from "@/types";
import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

interface ReferralsTableProps {
  referrals: Referral[];
}

export function ReferralsTable({ referrals }: ReferralsTableProps) {
  if (referrals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>Track your referred users</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.p
              className="text-center text-muted-foreground py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              No referrals yet. Share your link to get started!
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>
            {referrals.length} user{referrals.length !== 1 ? "s" : ""} referred
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral, index) => (
                  <motion.tr
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.6 + index * 0.1,
                    }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {referral.userName}
                    </TableCell>
                    <TableCell>{referral.userEmail}</TableCell>
                    <TableCell>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.7 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {referral.status === "converted" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Converted</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-yellow-600">Pending</span>
                          </>
                        )}
                      </motion.div>
                    </TableCell>
                    <TableCell>{formatDate(referral.joinedAt)}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
