"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Card from "./Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  className?: string;
}

function MetricCard({ title, value, change, changeLabel, icon, className }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "text-sm font-semibold",
                  isPositive ? "text-emerald-600" : "text-red-600"
                )}
              >
                {isPositive ? "↑" : "↓"} {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-gray-400 dark:text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="rounded-xl bg-evt-100 dark:bg-evt-900/30 p-3 text-evt-600 dark:text-evt-400">
          {icon}
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-evt-500/10 to-rose-500/10" />
    </Card>
  );
}

export { MetricCard };
