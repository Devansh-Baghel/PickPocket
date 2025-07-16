import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Saves from "~/components/Saves";
import { useAuthStore } from "~/stores/authStore";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

export default function Dashboard() {
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);
  const loading = useAuthStore((state) => state.loading);
  const signOut = useAuthStore((state) => state.signOut);

  if (loading) return <div>Loading Auth Status...</div>;

  if (!session) navigate({ to: "/login" });

  return (
    <div className="p-2">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={signOut}>Log Out</button>
      <br />
      <br />
      <div>
        <Saves />
      </div>
    </div>
  );
}
