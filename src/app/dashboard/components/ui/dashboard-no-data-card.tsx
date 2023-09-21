import { Card, CardDescription, CardTitle } from "../../../components/ui/card";

export function DashboardNoDataCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="p-8 w-full">
      <CardTitle className="mb-6">{title}</CardTitle>
      <CardDescription className="mb-6">{description}</CardDescription>
    </Card>
  );
}
