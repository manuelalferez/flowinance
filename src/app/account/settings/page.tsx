import { Separator } from "@/app/components/ui/separator";
import { UserInfo } from "./user-info";
import { Card } from "@/app/components/ui/card";
import SettingsConfig from "./config";
import { DeleteAccount } from "./delete-account";

export default function Settings() {
  return (
    <div>
      <main className="flex flex-col p-24 items-center">
        <Card className="w-1/2 flex flex-col items-start p-8 h-fit gap-4">
          <div>
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Update your account settings. Set your preferred currency, the
              delimiter your .csv files have and much more.
            </p>
          </div>
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
