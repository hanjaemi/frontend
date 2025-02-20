import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  type: "common" | "important" | "new";
  timestamp?: string;
}

const typeIcons = {
  common: Bookmark,
  important: Star,
  new: Clock,
};

const typeDescriptions = {
  common: "Common vocabulary word",
  important: "Important vocabulary to remember",
  new: "Newly introduced vocabulary",
};

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
  const vocabularyWords = [
    {
      id: "1",
      word: "안녕하세요",
      meaning: "Hello (formal)",
      type: "common",
      timestamp: "0:05",
    },
    {
      id: "2",
      word: "감사합니다",
      meaning: "Thank you (formal)",
      type: "important",
      timestamp: "1:15",
    },
    {
      id: "3",
      word: "미안합니다",
      meaning: "I'm sorry (formal)",
      type: "new",
      timestamp: "2:30",
    },
  ];

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
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
