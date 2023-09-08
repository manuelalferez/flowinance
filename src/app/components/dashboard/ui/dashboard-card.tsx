import React from "react";
import { Card, CardTitle } from "../../ui/card";

export function DashboardCard({
  children,
  title,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <Card className={`flex flex-col items-center p-8 h-fit ${className}`}>
      <CardTitle className="mb-6">{title}</CardTitle>
      {children}
    </Card>
  );
}
