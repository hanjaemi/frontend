import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, MessageCircle, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GrammarRule {
  id: string;
  title: string;
  description: string;
  type: "writing" | "speaking" | "common";
  timestamp?: string;
}

const typeIcons = {
  writing: Pen,
  speaking: MessageCircle,
  common: Book,
};

const typeDescriptions = {
  writing: "Writing-related grammar point",
  speaking: "Speaking-related grammar point",
  common: "Common grammar point",
};

export function Grammar({
  level,
  onGrammarClick,
}: {
  level: string;
  onGrammarClick: (grammar: string, timestamp?: string) => void;
}) {
  const grammarRules = [
    {
      id: "1",
      title: "~습니다/입니다",
      description: "Basic polite ending for statements",
      type: "common",
      timestamp: "0:15",
    },
    {
      id: "2",
      title: "~고 싶다",
      description: "Express desire to do something",
      type: "speaking",
      timestamp: "1:30",
    },
    {
      id: "3",
      title: "~(으)ㄹ 것 같다",
      description: "Express assumption or likelihood",
      type: "writing",
      timestamp: "2:45",
    },
  ];

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="space-y-4 p-4">
          {grammarRules.map((rule) => {
            const Icon = typeIcons[rule.type];
            return (
              <Button
                key={rule.id}
                variant="outline"
                className="w-full h-auto py-3 justify-start text-left hover:bg-muted"
                onClick={() => onGrammarClick(rule.title, rule.timestamp)}
              >
                <div className="flex items-start gap-4 min-h-[64px]">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="rounded-md bg-muted p-2 shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{typeDescriptions[rule.type]}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold leading-none">{rule.title}</h3>
                    <p className="text-sm text-muted-foreground">
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
