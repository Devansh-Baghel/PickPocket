import CheckAuth from "@/components/CheckAuth";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { FontProvider } from "@/providers/providers";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen pt-14 md:pt-0">
      {/* Mobile TopBar */}
      <TopBar />

      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 min-h-screen">{children}</div>
      </div>
    </main>
  );
}

function RouteComponent() {
  const getSession = useAuthStore((state) => state.getSession);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <FontProvider>
      <CheckAuth>
        <Dashboard>
          <Outlet />
        </Dashboard>
      </CheckAuth>
    </FontProvider>
  );
}
