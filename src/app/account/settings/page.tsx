import { Separator } from "@/app/components/ui/separator";
import { UserInfo } from "./user-info";
import { Card } from "@/app/components/ui/card";
import SettingsConfig from "./config";
import { DeleteAccount } from "./delete-account";

export default function Settings() {
  return (
    <div>
      <main className="min-h-screen flex flex-col p-2 md:p-24 items-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Settings</h1>
        <Card className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-start p-8 h-fit gap-4">
          <UserInfo />
          <Separator />
          <SettingsConfig />
          <Separator />
          <DeleteAccount />
        </Card>
      </main>
    </div>
  );
}
