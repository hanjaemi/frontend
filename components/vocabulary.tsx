import { Star, CircleDot, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type VocabType = "important" | "common" | "new";

type VocabularyWord = {
  id: string;
  word: string;
  meaning: string;
  type: VocabType;
  timestamp: string;
};

const typeIcons = {
  important: Star,
  common: CircleDot,
  new: Sparkles,
} as const;

const typeDescriptions = {
  important: "Important vocabulary",
  common: "Common vocabulary",
  new: "Newly introduced vocabulary",
} as const;

const vocabularyWords: VocabularyWord[] = [
  {
    id: "1",
    word: "도와주세요",
    meaning: "Please help me",
    type: "important",
    timestamp: "0:05",
  },
  {
    id: "2",
    word: "저는",
    meaning: "I am (polite)",
    type: "common",
    timestamp: "1:15",
  },
  {
    id: "3",
    word: "이름이",
    meaning: "My name is",
    type: "new",
    timestamp: "2:30",
  },
  {
    id: "4",
    word: "국적이",
    meaning: "I am from (polite)",
    type: "important",
    timestamp: "3:45",
  },
  {
    id: "5",
    word: "연락처",
    meaning: "Contact information",
    type: "common",
    timestamp: "5:00",
  },
  {
    id: "6",
    word: "도서관",
    meaning: "Library",
    type: "new",
    timestamp: "6:15",
  },
  {
    id: "7",
    word: "지하철",
    meaning: "Subway",
    type: "important",
    timestamp: "7:30",
  },
];

export function Vocabulary({
  type,
  id,
  onWordClick,
  disabled,
}: {
  type: string;
  id: string;
  onWordClick: (word: string, timestamp?: string) => void;
  disabled?: boolean;
}) {
  return (
    <TooltipProvider>
      <ScrollArea className={type === "level" ? "h-[600px]" : "h-[400px]"}>
        <div className="space-y-4 p-4">
          {vocabularyWords.map((word) => {
            const Icon = typeIcons[word.type];
            return (
              <Button
                key={word.id}
                variant="outline"
                className="w-full h-auto py-3 justify-start text-left hover:bg-muted"
                onClick={() =>
                  onWordClick && onWordClick(word.word, word.timestamp)
                }
                disabled={disabled}
              >
                <div className="flex items-start gap-4 min-h-[64px]">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="rounded-md bg-muted p-2 shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{typeDescriptions[word.type]}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold leading-none">{word.word}</h3>
                    <p className="text-sm text-muted-foreground">
                      {word.meaning}
                    </p>
                    {word.timestamp && (
                      <p className="text-xs text-muted-foreground">
                        Timestamp: {word.timestamp}
                      </p>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}
