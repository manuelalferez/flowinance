"use client";
import React from "react";

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
    <div className="w-1/3 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <div className="bg-gray-200 p-1 rounded-md h-4 w-4 md:w-7 md:h-7 animate-pulse"></div>
          <div className="bg-gray-200 w-16 h-4 md:h-7 md:w-24 rounded-md animate-pulse"></div>
        </div>

        <div className="bg-gray-200 w-16 h-4 md:h-7 md:w-24 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export function BalanceSkeleton() {
  return (
    <div className="w-full md:w-1/3 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <div className="bg-gray-200 p-1 rounded-md w-7 h-7 animate-pulse"></div>
          <div className="bg-gray-200 h-7 w-24 rounded-md animate-pulse"></div>
        </div>

        <div className="font-mono tabular-nums md:text-3xl text-2xl font-semibold leading-none tracking-tight">
          <div className="bg-gray-200 h-7 w-32 rounded-md animate-pulse"></div>
        </div>

        <div className="flex flex-col w-fit bg-gray-50 p-2 rounded-md">
          <div className="flex gap-1 text-sm text-muted-foreground">
            <div className="bg-gray-200 h-4 w-16 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryChartSkeleton() {
  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center justify-center">
        <div className="text-lg font-semibold leading-none tracking-tight">
          <div className="bg-gray-200 h-7 w-32 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="animate-pulse w-full h-[400px] flex flex-col items-center justify-center">
        <div className="flex w-full h-full">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full h-[320px] bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
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
