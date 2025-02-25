import { Star, CircleDot, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { getStudyData } from "@/services/api";
import Skeleton from "react-loading-skeleton";

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

export function VocabularyLoading() {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-full h-[100px] p-3">
          <div className="flex items-start gap-4">
            <Skeleton circle width={40} height={40} />
            <div className="flex-1 space-y-2">
              <Skeleton width={120} height={20} />
              <Skeleton width={200} height={16} />
              <Skeleton width={80} height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Vocabulary({
  type,
  id,
  onWordClick,
  disabled,
  data,
  isLoading,
}: {
  type: string;
  id: string;
  onWordClick: (word: string, timestamp?: string) => void;
  disabled?: boolean;
  data: VocabularyWord[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <ScrollArea className={type === "level" ? "h-[780px]" : "h-[370px]"}>
        <VocabularyLoading />
      </ScrollArea>
    );
  }

  return (
    <TooltipProvider>
      <ScrollArea className={type === "level" ? "h-[780px]" : "h-[370px]"}>
        <div className="space-y-4 p-4">
          {data.map((word) => {
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
