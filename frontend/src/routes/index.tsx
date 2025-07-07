import { createFileRoute } from '@tanstack/react-router'
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: session } = authClient.useSession();

  console.log(session);

  return (
    <div className="p-2">
      {!session ? (
        <button
          onClick={() => authClient.signIn.social({ provider: "github" })}
        >
          Sign In
        </button>
      ) : (
        <button onClick={() => authClient.signOut({})}>Log Out</button>
      )}
      <h3 className="font-serif">Welcome Home!</h3>
    </div>
  );
}
