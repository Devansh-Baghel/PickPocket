import { authClient } from "~/lib/auth-client";

export default function SignInButton() {
  const handleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });

    console.log(data);
  };

  const handleSignOut = async () => {
    const data = await authClient.signOut();

    console.log(data);
  };

  return (
    <>
      <button
        onClick={handleSignIn}
        className="px-4 py-2 rounded bg-black text-white"
      >
        Sign in with GitHub
      </button>

      <button
        onClick={handleSignOut}
        className="px-4 py-2 rounded bg-black text-white"
      >
        Sign out
      </button>
    </>
  );
}
