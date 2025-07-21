import CheckAuth from "@/components/CheckAuth";
import { FontProvider, ThemeProvider } from "@/providers/providers";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function RouteComponent() {
  const getSession = useAuthStore((state) => state.getSession);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <ThemeProvider>
      <FontProvider>
        <CheckAuth>
          <Outlet />
        </CheckAuth>
      </FontProvider>
    </ThemeProvider>
  );
}
