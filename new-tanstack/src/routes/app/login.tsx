import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { GithubIcon, GoogleIcon, PocketIcon } from "@/utils/icons";

export const Route = createFileRoute("/app/login")({
  component: RouteComponent,
});

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signInGithub = useAuthStore((state) => state.signInGithub);
  const signInGoogle = useAuthStore((state) => state.signInGoogle);

  return (
    <section className="flex min-h-screen bg-background px-4 py-16 md:py-32 dark:bg-transparent">
      <form action="" className="max-w-92 mx-auto h-fit w-full">
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

          <div className="space-y-6">
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
              />
            </div>

            <Button className="w-full">Continue</Button>
          </div>
          {/* <p className="text-accent-foreground text-center text-sm mt-6">
            We’ll sign you in or create an account.
          </p> */}
        </div>
      </form>
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
