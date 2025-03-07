"use client";

import {
  Home,
  Youtube,
  Music,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    title: "Main",
    icon: Home,
    href: "/study",
  },
  {
    title: "TOPIC",
    icon: BookOpen,
    href: "/topic",
  },
  {
    title: "YouTube",
    icon: Youtube,
    href: "/youtube",
  },
];

const JaemiLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Sidebar({
  open,
  isMobile,
  onToggle,
}: {
  open: boolean;
  isMobile: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    // Here you would typically handle the sign out logic
    // For now, we'll just redirect to the main page
    router.push("/");
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-muted/40 transition-all duration-300",
        isMobile ? "fixed inset-y-0 left-0 z-50 w-64" : "relative",
        open ? "w-64" : "w-16"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between p-4",
          open ? "" : "justify-center"
        )}
      >
        <div className="flex items-center gap-2 pl-4">
          <Link href="/" className="flex items-center gap-2">
            <JaemiLogo />
            {open && <h1 className="text-2xl font-bold">Jaemi</h1>}
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {open ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                open ? "gap-2" : "justify-center p-2"
              )}
              title={item.title}
            >
              <item.icon className="h-4 w-4" />
              {open && <span>{item.title}</span>}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start",
            open ? "gap-2" : "justify-center p-2"
          )}
          title="Sign Out"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          {open && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}
