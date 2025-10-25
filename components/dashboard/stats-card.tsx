"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: delay + 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="text-2xl font-bold"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: delay + 0.3,
              type: "spring",
              stiffness: 150,
            }}
          >
            {value}
          </motion.div>
          {description && (
            <motion.p
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4 }}
            >
              {description}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
