import CheckAuth from "@/components/CheckAuth";
import { TopBar } from "@/components/TopBar";
import { FontProvider, ThemeProvider } from "@/providers/providers";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background min-h-screen">
      <TopBar />
      {/* Add padding-top to account for the fixed TopBar */}
      <div className="pt-20">{children}</div>
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
