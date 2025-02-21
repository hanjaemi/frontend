"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const showSidebar = !["/", "/login", "/register"].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {showSidebar && (
            <Sidebar
              open={sidebarOpen}
              isMobile={isMobile}
              onToggle={toggleSidebar}
            />
          )}
          <div
            className={`flex-1 transition-all duration-300 ${
              showSidebar && sidebarOpen && !isMobile ? "ml-0" : "ml-0"
            }`}
          >
            <main className="">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
