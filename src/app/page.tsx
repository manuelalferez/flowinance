import Dashboard from "./components/dashboard";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col items-center p-24">
        <Dashboard />
      </main>
    </div>
  );
}
