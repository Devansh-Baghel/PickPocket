import { FontToggle } from "@/components/FontToggle";
import { ThemeSelector } from "@/components/ThemeToggle";
import { createFileRoute } from "@tanstack/react-router";
import { LoggedIn, LoginPage } from "@/routes/app/login";

export const Route = createFileRoute("/app/sink")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-w-4xl mx-auto mt-20 flex flex-col gap-10 px-4">
      <div className="space-y-8">
        <ThemeSelector />
        <FontToggle />
      </div>

      <div className="border-t pt-8">
        <h2 className="text-lg font-semibold mb-4">Login Components Preview</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-medium mb-4">Login Page</h3>
            <LoginPage />
          </div>

          <div>
            <h3 className="font-medium mb-4">Logged In View</h3>
            <LoggedIn />
          </div>
        </div>
      </div>
    </section>
  );
}
