"use client";

import { authClient } from "~/lib/auth-client";

export default function SignInButton() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 rounded bg-black text-white"
    >
      Sign in with GitHub
    </button>
  );
}
