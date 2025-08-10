import CheckAuth from "@/components/CheckAuth";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { FontProvider } from "@/providers/providers";
import { useAuthStore } from "@/stores/authStore";
import { useSidebar } from "@/stores/sidebarStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function Dashboard({ children }: { children: React.ReactNode }) {
  const isCollapsed = useSidebar((s) => s.isCollapsed);

  return (
    <main className="min-h-screen pt-14 md:pt-0">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <div
          className={`min-h-screen flex-1 transition-all duration-300 ${
            isCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          {children}
        </div>
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
