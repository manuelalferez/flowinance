import AddTransactionForm from "./add-transaction-form";

export default function Page() {
  return (
    <div className="flex justify-center">
      <main className="flex flex-col p-24 w-3/4">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Add a Transaction</h1>
          <p className="text-gray-600">
            Please fill in the required fields below and click Upload when you
            are ready to proceed
          </p>
        </div>

        <AddTransactionForm />
      </main>
    </div>
  );
}
