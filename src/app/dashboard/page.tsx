import Dashboard from "../components/dashboard/dashboard";

export default async function Page() {
  return (
    <div className="min-h-screen mb-2">
      <main className="flex flex-col items-center p-24">
        <Dashboard />
      </main>
    </div>
  );
}
