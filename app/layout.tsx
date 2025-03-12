"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggleCorner } from "@/components/theme-toggle-corner";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !["/", "/login", "/register"].includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Toaster closeButton position="top-right" theme="system" />
          <ThemeToggleCorner />
          <div className="flex min-h-screen">
            {showSidebar ? (
              <SidebarProvider>
                <AppSidebar />
                <main className="flex-1">{children}</main>
              </SidebarProvider>
            ) : (
              <div className="flex-1">
                <main>{children}</main>
              </div>
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
