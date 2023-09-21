import React from "react";
import { Card, CardTitle } from "../../../components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";

export function DashboardCard({
  children,
  title,
  description,
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <Card
      className={`w-full flex flex-col items-center p-8 h-fit ${className}`}
    >
      <div className="flex items-center gap-2 pb-6 justify-between">
        {title && <CardTitle>{title}</CardTitle>}
        {description && (
          <HoverCard>
            <HoverCardTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM1.827 7.5a5.673 5.673 0 1 1 11.346 0a5.673 5.673 0 0 1-11.346 0Zm6.423-3a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0ZM6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6V6Z"
                  clipRule="evenodd"
                />
              </svg>
            </HoverCardTrigger>
            <HoverCardContent>{description}</HoverCardContent>
          </HoverCard>
        )}
      </div>

      {children}
    </Card>
  );
}
