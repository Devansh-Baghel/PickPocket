import Saves from "@/components/SavesView";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
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
