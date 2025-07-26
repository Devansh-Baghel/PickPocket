import Saves from "@/components/SavesView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/saves")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/saves"!
      <Saves />
    </div>
  );
}
