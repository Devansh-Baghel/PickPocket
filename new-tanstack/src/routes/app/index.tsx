import Saves from "@/components/SavesView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      This is the default component in /app/
      <Saves />
    </div>
  );
}
