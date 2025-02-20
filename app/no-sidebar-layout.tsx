import { Inter } from "next/font/google"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function NoSidebarLayout({ children }: { children: ReactNode }) {
  return <div className={`min-h-screen ${inter.className}`}>{children}</div>
}

