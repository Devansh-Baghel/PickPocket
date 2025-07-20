import { LoginForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";
// src/routes/index.tsx

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <section className="max-w-96 mx-auto mt-20">
      <LoginForm />
    </section>
  );
}
