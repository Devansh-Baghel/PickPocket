import { createFileRoute } from '@tanstack/react-router'
import Saves from "~/components/Saves";
import { useAuthStore } from "~/stores/authStore";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

export default function Dashboard() {
  const { session, signIn, signOut, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-2">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {!session ? (
        <button onClick={signIn}>Sign In</button>
      ) : (
        <div>
          <button onClick={signOut}>Log Out</button>
          <Saves />
        </div>
      )}
    </div>
  );
}

