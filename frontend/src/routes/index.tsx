import { createFileRoute } from '@tanstack/react-router'
import SignInButton from "~/components/SignInButton";
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <SignInButton />
    </div>
  );
}
