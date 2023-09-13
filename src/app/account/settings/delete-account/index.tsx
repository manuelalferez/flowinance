import { CustomDialog } from "./custom-dialog";

export function DeleteAccount() {
  return (
    <CustomDialog>
      <div>
        <h3 className="text-lg font-medium">Delete account</h3>
        <p className="text-sm text-muted-foreground">
          Easily close your account and erase all personal data.
        </p>
      </div>
    </CustomDialog>
  );
}
