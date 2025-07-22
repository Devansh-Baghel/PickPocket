import { FontToggle } from "@/components/FontToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createFileRoute } from "@tanstack/react-router";
import { LoggedIn, LoginPage } from "@/routes/app/login";

export const Route = createFileRoute("/app/sink")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-w-96 mx-auto mt-20 flex flex-col gap-10">
      <ThemeToggle />
      <FontToggle />

      <h2>Login Page at /app/login</h2>
      <LoginPage />

      <h2>What logged in user sees at /app/login</h2>
      <LoggedIn />
    </section>
  );
}
