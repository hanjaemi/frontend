"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !["/", "/login", "/register"].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
