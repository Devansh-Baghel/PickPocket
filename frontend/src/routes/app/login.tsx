import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { GithubIcon, GoogleIcon, PocketIcon } from "@/utils/icons";
import { useState } from "react";

export const Route = createFileRoute("/app/login")({
  component: RouteComponent,
});

function MagicLinkSent({ email }: { email: string }) {
  return (
    <section className="flex min-h-screen bg-background px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="max-w-92 mx-auto h-fit w-full">
        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-xl font-semibold">Check your email</h1>
            <p className="text-muted-foreground">
              We've sent a verification link to <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                Click the <strong>verify</strong> button in the email to sign in
                to your account. The link will expire in{" "}
                <strong>10 minutes</strong>.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signInGithub = useAuthStore((state) => state.signInGithub);
  const signInGoogle = useAuthStore((state) => state.signInGoogle);
  const signInMagicLink = useAuthStore((state) => state.signInMagicLink);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsEmailSent(true);

    await signInMagicLink(email);
  };

  if (isEmailSent) return <MagicLinkSent email={email} />;

  return (
    <section className="flex min-h-screen bg-background px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="max-w-92 mx-auto h-fit w-full">
        <div className="p-6">
          <div>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Continue to PickPocket
            </h1>
            <p className="text-muted-foreground">
              Save articles and read them distraction-free, anytime.
              {/* Save articles. Read anytime. */}
              {/* Sign in or create an account to save articles and read them distraction-free. */}
              {/* Sign in or create an account to start saving articles. */}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={signInGoogle}
            >
              <GoogleIcon />
              <span className="ml-2">Continue with Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={signInGithub}
            >
              <GithubIcon className="size-[19px]" />
              <span className="ml-2">Continue with Github</span>
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">
              Or continue with your email
            </span>
            <hr className="border-dashed" />
          </div>

          <form onSubmit={handleMagicLinkSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email address
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button className="w-full">Continue</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function LoggedIn() {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <section className="flex min-h-screen px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="max-w-92 mt-20 mx-auto h-fit w-full">
        <div className="p-6">
          <div>
            <Link
              to="/"
              aria-label="go home"
              className="text-2xl font-extrabold flex items-center gap-2"
            >
              <PocketIcon />
              Pick Pocket
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              You’re already signed in!
            </h1>
            <p className="text-muted-foreground">
              Start saving articles or keep reading.
            </p>
          </div>
          <div className="mt-6">
            <Button asChild className="w-full">
              <Link to="/app">Go to your Saves</Link>
            </Button>
          </div>
          <p className="text-accent-foreground text-center text-sm mt-4">
            Need to switch accounts?
            <Button
              variant="link"
              className="px-2 hover:cursor-pointer"
              onClick={signOut}
            >
              Sign out
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}

function RouteComponent() {
  const session = useAuthStore((state) => state.session);

  if (session) return <LoggedIn />;

  return <LoginPage />;
}
