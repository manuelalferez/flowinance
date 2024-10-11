import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { DashboardCard } from "../ui/dashboard-card";

export function DashboardSkeleton() {
  return (
    <div>
      <div className="w-full animate-pulse">
        <FilterSkeleton />
        <div className="flex gap-2 justify-between flex-wrap md:flex-nowrap mt-4">
          <BalanceSkeleton />
          <div className="flex gap-0 sm:gap-1  w-full md:w-2/3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
        <div className="flex justify-center flex-wrap mt-2">
          <SummaryChartSkeleton />
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardDescription className="flex items-center gap-1">
          <div className="bg-gray-200 p-1 rounded-md h-3 w-3 md:w-7 md:h-7 animate-pulse"></div>
          <div className="bg-gray-200 w-16 h-4 md:h-7 md:w-24 rounded-md animate-pulse"></div>
        </CardDescription>

        <div className="bg-gray-200 w-16 h-4 md:h-7 md:w-24 rounded-md animate-pulse"></div>
      </CardHeader>
    </Card>
  );
}

export function BalanceSkeleton() {
  return (
    <Card className="w-full md:w-1/3">
      <CardHeader>
        <CardDescription className="flex items-center gap-1">
          <div className="bg-gray-200 p-1 rounded-md w-7 h-7 animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-24 rounded-md animate-pulse"></div>
        </CardDescription>

        <CardTitle className="font-mono tabular-nums text-2xl md:text-3xl">
          <div className="bg-gray-200 h-8 w-32 rounded-md animate-pulse"></div>
        </CardTitle>

        <div className="flex flex-col w-fit bg-gray-50 p-2 rounded-md">
          <CardDescription className="flex gap-1">
            <div className="bg-gray-200 h-4 w-16 rounded-md animate-pulse"></div>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

function SummaryChartSkeleton() {
  return (
    <div className="w-full">
      <DashboardCard>
        <div className="animate-pulse w-full h-[400px] flex flex-col items-center justify-center">
          <div className="flex w-full h-full">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-full h-[320px] bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

function FilterSkeleton() {
  const options = ["This year", "Last 3 months", "Last 30 days", "Last 7 days"];

  return (
    <div className="flex justify-center gap-2 animate-pulse">
      {options.map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg w-24 h-6 md:w-28 md:h-8"
        ></div>
      ))}
    </div>
  );
}
