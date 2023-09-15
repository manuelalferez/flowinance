import { Card, CardDescription, CardTitle } from "@/app/components/ui/card";

export default function NoTransactions() {
  return (
    <div>
      <CardTitle className="mb-6 flex justify-center text-2xl">
        No transactions yet
      </CardTitle>
      <Card>
        <CardDescription className="p-5 text-lg">
          You can start tracking your spending 💸. Just click on the buttons
          above!
        </CardDescription>
        <CardDescription className="p-5 text-lg">
          <span className="text-xl">How does it work?</span> <br />{" "}
          <b>Upload files:</b> Normally banks provide support for you to
          download your transactions. The file they provide you can be in
          different formats.{" "}
          <a
            href="https://cloudconvert.com/"
            className="font-medium underline"
            target="_blank"
          >
            Transform it into csv format
          </a>{" "}
          and upload it. We take care of the rest ;) Start by clicking{" "}
          <span className="bg-black p-1 px-2 rounded-sm text-white text-sm">
            Upload
          </span>{" "}
          on the button above.
          <br />
          <b>Add transactions:</b> You have independent expenses and you want to
          upload them manually? You can do it too. Just click on the{" "}
          <span className="bg-black p-1 px-2 rounded-sm text-white text-sm">
            Add
          </span>{" "}
          button above.
        </CardDescription>
      </Card>
    </div>
  );
}
