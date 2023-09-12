import Dashboard from "./components/dashboard";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col items-center py-24">
        <Dashboard />
      </main>
    </div>
  );
}
