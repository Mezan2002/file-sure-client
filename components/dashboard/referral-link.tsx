"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ReferralLinkProps {
  link: string;
}

export function ReferralLink({ link }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Link</CardTitle>
        <CardDescription>
          Share this link with friends to earn credits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input value={link} readOnly className="flex-1" />
          <Button onClick={handleCopy} size="icon" variant="outline">
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
