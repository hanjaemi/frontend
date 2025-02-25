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

export function Grammar({
  type,
  id,
  onGrammarClick,
  disabled,
  data,
}: {
  type: string;
  id: string;
  onGrammarClick: (grammar: string, timestamp?: string) => void;
  disabled?: boolean;
  data: GrammarRule[];
}) {
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
