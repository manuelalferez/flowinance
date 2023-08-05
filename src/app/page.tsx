import { DragAndDrop } from "./components/drag-and-drop";
import { Transactions } from "./components/transactions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl pb-10">Finance graph</h1>
      <DragAndDrop />
      <h1 className="text-xl pt-10 pb-5">Transactions:</h1>
      <Transactions />
    </main>
  );
}
