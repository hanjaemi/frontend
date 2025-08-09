import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Difficulty = {
  difficultyId: number;
  name: string;
  description: string;
  lessonCount: number;
};

export default async function StudyPage() {
  const res = await fetch("http://3.35.22.146:8080/difficulty", {
    cache: "no-store", // always fresh
  });
  if (!res.ok) throw new Error("Failed to load difficulty list");
  const levels: Difficulty[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Choose Your Level</h1>
        <p className="text-muted-foreground text-center mb-12">
          Select the level that matches your current Korean proficiency
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Link key={level.difficultyId} href={`/study/${level.difficultyId}`}>
              <Card className="group transition-all hover:shadow-lg">
                <CardContent className="aspect-square p-6 flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{level.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {level.description}
                  </p>
                  <Badge variant="secondary" className="text-sm">
                    {`${level.lessonCount} ${level.lessonCount === 1 ? "lesson" : "lessons"}`}
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
