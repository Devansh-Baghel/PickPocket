// frontend/src/components/CheckAuth.tsx
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { AppSkeleton } from "@/components/AppSkeleton";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((state) => state.session);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  // Show full app skeleton while loading
  if (loading) return <AppSkeleton />;

  if (!session) navigate({ to: "/app/login" });

  return <>{children}</>;
}
