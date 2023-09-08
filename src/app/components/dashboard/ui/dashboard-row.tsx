import React from "react";

export function DashboardRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex justify-around gap-2 ${className}`}>{children}</div>
  );
}
