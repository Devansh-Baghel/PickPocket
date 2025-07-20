import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((state) => state.session);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  if (loading) return <div>Loading Auth Status...</div>;
  if (!session) navigate({ to: "/login" });

  return <>{children}</>;
}
