import React from "react";

export function DashboardRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 flex-wrap lg:flex-nowrap ${className}`}>
      {children}
    </div>
  );
}
