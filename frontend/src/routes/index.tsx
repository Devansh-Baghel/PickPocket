import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="p-2">
      <h1>Landing Page here </h1>
      <Link to="/app">
        <Button>Continue to your dashboard!</Button>
      </Link>
      <div></div>
    </div>
  );
}
