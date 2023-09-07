import Dashboard from "./components/dashboard";

export default async function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-24">
        <Dashboard />
      </main>
    </div>
  );
}
