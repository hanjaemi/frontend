import { PenLine, MessageCircle, BookOpen } from "lucide-react";
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

type GrammarType = "writing" | "speaking" | "common";

type GrammarRule = {
  id: string;
  title: string;
  description: string;
  type: GrammarType;
  timestamp?: string;
};

const typeIcons = {
  writing: PenLine,
  speaking: MessageCircle,
  common: BookOpen,
} as const;

const typeDescriptions = {
  writing: "Writing exercise",
  speaking: "Speaking practice",
  common: "Common grammar point",
} as const;

export function GrammarLoading() {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-full h-[100px] p-3">
          <div className="flex items-start gap-4">
            <Skeleton circle width={24} height={24} />
            <div className="flex-1 space-y-2">
              <Skeleton width={200} height={20} />
              <Skeleton width={300} height={16} />
              <Skeleton width={80} height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Grammar({
  type,
  id,
  onGrammarClick,
  disabled,
  data,
  isLoading,
}: {
  type: string;
  id: string;
  onGrammarClick: (grammar: string, timestamp?: string) => void;
  disabled?: boolean;
  data: GrammarRule[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <ScrollArea className={type === "level" ? "h-[780px]" : "h-[370px]"}>
        <GrammarLoading />
      </ScrollArea>
    );
  }

  return (
    <TooltipProvider>
      <ScrollArea className={type === "level" ? "h-[780px]" : "h-[370px]"}>
        <div className="space-y-4 p-4">
          {data.map((rule) => {
            const Icon = typeIcons[rule.type];
            return (
              <Button
                key={rule.id}
                variant="outline"
                className="w-full h-auto py-3 justify-start text-left hover:bg-muted cursor-pointer"
                onClick={() => onGrammarClick(rule.title, rule.timestamp)}
                disabled={disabled}
              >
                <div className="flex items-start gap-4 w-full">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{typeDescriptions[rule.type]}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex-1 space-y-1 min-w-0">
                    <h3 className="font-semibold leading-none break-words">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-normal break-words">
                      {rule.description}
                    </p>
                    {rule.timestamp && (
                      <p className="text-xs text-muted-foreground">
                        Timestamp: {rule.timestamp}
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
