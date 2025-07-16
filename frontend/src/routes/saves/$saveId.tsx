import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/saves/$saveId")({
  component: RouteComponent,
});

function RouteComponent() {
  const {} = useQuery({
    queryKey: ["saves"],
  });
  return <div>Hello "/posts/$saveId"!</div>;
}
