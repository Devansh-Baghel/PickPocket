import { FontToggle } from "@/components/FontToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/routes/app/login";

export const Route = createFileRoute("/sink")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-w-96 mx-auto mt-20 flex flex-col gap-10">
      <ThemeToggle />
      <FontToggle />
      <LoginPage />
    </section>
  );
}
