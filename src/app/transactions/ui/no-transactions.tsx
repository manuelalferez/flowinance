import { Card, CardDescription, CardTitle } from "@/app/components/ui/card";

export default function NoTransactions() {
  return (
    <div>
      <CardTitle className="mb-6 flex justify-center text-2xl">
        No transactions yet
      </CardTitle>
      <Card>
        <CardDescription className="p-5 text-lg">
          Start tracking your spending 💸. Hover over each button to see what
          you can do. <br />
        </CardDescription>
      </Card>
    </div>
  );
}
