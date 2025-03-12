import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummarySection {
  id: string;
  title: string;
  content: string[];
}

const summaryData: SummarySection[] = [
  {
    id: "1",
    title: "Key Grammar Points",
    content: [
      "Basic sentence structure: Subject + Object + Verb",
      "Formal vs. Informal speech levels",
      "Past, Present, and Future tense markers",
    ],
  },
  {
    id: "2",
    title: "Essential Vocabulary",
    content: [
      "Greetings and basic expressions",
      "Numbers and counting systems",
      "Common verbs and adjectives",
    ],
  },
  {
    id: "3",
    title: "Cultural Notes",
    content: [
      "Honorific system in Korean language",
      "Age-based speech levels",
      "Cultural context for formal vs. informal speech",
    ],
  },
];

export function Summary({ level }: { level: string }) {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {summaryData.map((section) => (
            <Card key={section.id}>
              <CardHeader className="py-3">
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <ul className="list-inside list-disc space-y-1">
                  {section.content.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
