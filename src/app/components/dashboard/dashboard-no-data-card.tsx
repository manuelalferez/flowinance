import { Card, CardDescription, CardTitle } from "../ui/card";

export function DashboardNoDataCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="p-8">
      <CardTitle className="mb-6">{title}</CardTitle>
      <CardDescription className="mb-6">{description}</CardDescription>
    </Card>
  );
}
