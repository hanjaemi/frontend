import { Button } from "@/components/ui/button"
import Link from "next/link"
import NoSidebarLayout from "./no-sidebar-layout"
import { ArrowRight } from "lucide-react"

const JaemiLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const companies = [
  { name: "Seoul National University", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Korean Cultural Center", logo: "/placeholder.svg?height=40&width=120" },
  { name: "King Sejong Institute", logo: "/placeholder.svg?height=40&width=120" },
  { name: "TOPIK Organization", logo: "/placeholder.svg?height=40&width=120" },
]

export default function Home() {
  return (
    <NoSidebarLayout>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <JaemiLogo />
            <span className="text-xl font-bold">Jaemi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-6xl font-bold tracking-tight">
              Learn Korean the fun way.
              <span className="text-primary">재미있게</span>
            </h1>
            <p className="mb-12 text-xl text-muted-foreground">
              Master Korean through interactive lessons, real-world content, and AI-powered assistance. Join over
              100,000 learners discovering the joy of Korean language.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  See our plans
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Real-world Content</h3>
              <p className="text-muted-foreground">
                Learn from K-pop songs, YouTube videos, and authentic Korean media
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">AI-Powered Learning</h3>
              <p className="text-muted-foreground">
                Get instant feedback and personalized assistance from our AI tutor
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Learn at Your Pace</h3>
              <p className="text-muted-foreground">Flexible learning paths adapted to your schedule and proficiency</p>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="container mx-auto px-4 py-24 text-center">
          <p className="mb-8 text-sm text-muted-foreground">Trusted by leading Korean language institutions</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale">
            {companies.map((company) => (
              <img
                key={company.name}
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                className="h-10 object-contain opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="rounded-2xl bg-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to start your Korean journey?</h2>
            <p className="mb-8 text-muted-foreground">Join thousands of learners mastering Korean with Jaemi</p>
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </NoSidebarLayout>
  )
}

