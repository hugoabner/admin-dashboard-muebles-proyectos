import { handleLogout } from "@/components/layout/auth/logout-button";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <form action={handleLogout}>
        <Button type="submit">Logout</Button>
      </form>{" "}
    </div>
  );
}
