import type { ReactNode } from "react";

export default function NoSidebarLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
