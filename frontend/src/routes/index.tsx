import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from "~/stores/authStore";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

export default function Dashboard() {
  const { session, signIn, signOut, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-2">
      {!session ? (
        <button onClick={signIn}>Sign In</button>
      ) : (
        <button onClick={signOut}>Log Out</button>
      )}
      <h3 className="font-serif">Welcome Home!</h3>
    </div>
  );
}

