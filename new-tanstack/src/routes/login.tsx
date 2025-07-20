import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useAuthStore((state) => state.session);
  const signIn = useAuthStore((state) => state.signIn);

  if (session) return <div>Already logged in!</div>;

  return (
    <div>
      Hello "/login"!
      <div>
        <button onClick={signIn}>Sign In</button>
      </div>
    </div>
  );
}
