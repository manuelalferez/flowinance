import { Card, CardDescription, CardTitle } from "@/app/components/ui/card";

export default function NoTransactions() {
  return (
    <div>
      <CardTitle className="mb-6 flex justify-center text-2xl">
        No transactions yet
      </CardTitle>
      <Card>
        <CardDescription className="p-5 text-lg">
          Go to the transactions page, by clicking on the{" "}
          <span className="bg-black p-1 px-2 rounded-sm text-white text-sm">
            Transactions
          </span>{" "}
          button in the menu above, and start your financial adventure 🧗‍♀️.
        </CardDescription>
      </Card>
    </div>
  );
}
