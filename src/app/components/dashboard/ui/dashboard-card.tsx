import { Card, CardTitle } from "../../ui/card";

export function DashboardCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="flex flex-col items-center p-8 h-fit">
      <CardTitle className="mb-6">{title}</CardTitle>
      {children}
    </Card>
  );
}
