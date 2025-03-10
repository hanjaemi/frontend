import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const levels = [
  {
    id: 1,
    title: "Beginner 1",
    count: "20 lessons",
    description: "Start your Korean journey",
  },
  {
    id: 2,
    title: "Beginner 2",
    count: "25 lessons",
    description: "Build your foundation",
  },
  {
    id: 3,
    title: "Intermediate 1",
    count: "30 lessons",
    description: "Expand your skills",
  },
  {
    id: 4,
    title: "Intermediate 2",
    count: "30 lessons",
    description: "Enhance your fluency",
  },
  {
    id: 5,
    title: "Advanced 1",
    count: "35 lessons",
    description: "Master complex topics",
  },
  {
    id: 6,
    title: "Advanced 2",
    count: "35 lessons",
    description: "Achieve proficiency",
  },
];

export default function StudyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Choose Your Level
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          Select the level that matches your current Korean proficiency
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Link key={level.id} href={`/study/${level.id}`}>
              <Card className="group transition-all hover:shadow-lg">
                <CardContent className="aspect-square p-6 flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{level.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {level.description}
                  </p>
                  <Badge variant="secondary" className="text-sm">
                    {level.count}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
