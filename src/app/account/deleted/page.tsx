import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function AccountDeleted() {
  return (
    <div className="min-h-screen flex justify-center mt-40">
      <Card className="p-4 h-full">
        <CardHeader>
          <CardTitle>Your account has been deleted. </CardTitle>
        </CardHeader>
        <CardContent>
          It will disappear completely in less than one month. If you would like
          to reactivate it, please contact technical support at{" "}
          <b>manuelalferezruiz+flowinance@gmail.com</b>.
        </CardContent>
      </Card>
    </div>
  );
}
