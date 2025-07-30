import CheckAuth from "@/components/CheckAuth";
import { Sidebar } from "@/components/Sidebar";
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
      {/* Mobile TopBar */}
      <TopBar />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Add padding-top for mobile topbar, margin-left handled by sidebar */}
          {/* <div> */}
            {children}
          {/* </div> */}
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
