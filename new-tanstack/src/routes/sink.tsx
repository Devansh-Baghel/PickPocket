import { LoginForm } from "@/components/login-form";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sink")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-w-96 mx-auto mt-20">
      <ThemeToggle />
      <LoginForm />
    </section>
  );
}
