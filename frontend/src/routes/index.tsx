import { createFileRoute } from "@tanstack/react-router";
import Saves from "~/components/Saves";
import { useAuthStore } from "~/stores/authStore";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

export default function Dashboard() {
  const signOut = useAuthStore((state) => state.signOut);

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
