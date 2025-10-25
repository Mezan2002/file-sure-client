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
import { copyToClipboard } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReferralLinkProps {
  link: string;
}

export function ReferralLink({ link }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      toast.success("Copied!", {
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Error", {
        description: "Failed to copy link",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleCopy} size="icon" variant="outline">
                <motion.div
                  initial={false}
                  animate={{
                    rotate: copied ? 360 : 0,
                    scale: copied ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
