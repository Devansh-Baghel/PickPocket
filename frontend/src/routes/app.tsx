import CheckAuth from "@/components/CheckAuth";
import { FontProvider, ThemeProvider } from "@/providers/providers";
import { useAuthStore } from "@/stores/authStore";
import { MenuIcon, PocketIcon, ProfileIcon } from "@/utils/icons";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function TopBar() {
  return (
    <nav className="md:hidden flex justify-between text-2xl py-4 px-6 items-center">
      <MenuIcon className="size-8" />
      <span className="flex items-center gap-2 font-extrabold">
        <PocketIcon className="size-6" />
        PickPocket
      </span>
      <ProfileIcon className="size-8" />
    </nav>
  );
}

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-accent min-h-screen">
      <TopBar />
      <div>{children}</div>
    </main>
  );
}

function RouteComponent() {
  const getSession = useAuthStore((state) => state.getSession);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    // Having font and theme providers here means, that any font/theme options user chooses doesn't affect the look of the landing page at /
    <ThemeProvider>
      <FontProvider>
        <CheckAuth>
          <Dashboard>
            <Outlet />
          </Dashboard>
        </CheckAuth>
      </FontProvider>
    </ThemeProvider>
  );
}
