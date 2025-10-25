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
import { CheckCircle2, Clock } from "lucide-react";

interface ReferralsTableProps {
  referrals: Referral[];
}

export function ReferralsTable({ referrals }: ReferralsTableProps) {
  if (referrals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>Track your referred users</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No referrals yet. Share your link to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referrals</CardTitle>
        <CardDescription>
          {referrals.length} user{referrals.length !== 1 ? "s" : ""} referred
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {referrals.map((referral) => (
              <TableRow key={referral.id}>
                <TableCell className="font-medium">
                  {referral.userName}
                </TableCell>
                <TableCell>{referral.userEmail}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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
                  </div>
                </TableCell>
                <TableCell>{formatDate(referral.joinedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
