import Saves from "@/components/SavesView";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signOut } = useAuthStore();

  return (
    <div>
      <Button onClick={signOut}>Log Out</Button>
      This is the default component in /app/
      <Saves />
    </div>
  );
}
