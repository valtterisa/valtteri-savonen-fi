import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/info")({
  component: () => <Navigate to="/#about" replace />,
});
