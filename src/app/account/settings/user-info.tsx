import { getSession } from "@/app/supabase-server";

export async function UserInfo() {
  const session = await getSession();
  if (!session) {
    return <div>Not logged in</div>;
  }
  const user = session.user;
  return (
    <div>
      <h3 className="text-lg font-medium">Logged as</h3>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </div>
  );
}
