import { Card, CardDescription, CardTitle } from "../../../components/ui/card";

export function DashboardNoDataCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={`p-8 ${className}`}>
      <CardTitle className="mb-6 flex justify-center">{title}</CardTitle>
      <CardDescription className="mb-6">{description}</CardDescription>
    </Card>
  );
}
