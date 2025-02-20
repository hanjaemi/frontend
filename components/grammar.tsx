import { PenLine, MessageCircle, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const grammarRules: GrammarRule[] = [
  {
    id: "1",
    title: "~(이)ㄹ/를 수 있다",
    description:
      "Express ability to do something. Express ability to do something",
    type: "writing",
    timestamp: "",
  },
  {
    id: "2",
    title: "~(이)ㄹ/를 수 없다",
    description: "Express inability to do something",
    type: "writing",
    timestamp: "1:30",
  },
  {
    id: "3",
    title: "~(으)ㄴ/는/은/는/는",
    description: "Express reason or cause",
    type: "speaking",
    timestamp: "2:45",
  },
  {
    id: "4",
    title: "~(이)ㄹ/를/는/은/는 ",
    description: "Express passive voice",
    type: "writing",
    timestamp: "3:45",
  },
  {
    id: "5",
    title: "~(으)로/로/로/로",
    description: "Express manner or means",
    type: "speaking",
    timestamp: "4:45",
  },
  {
    id: "6",
    title: "~(이)ㄹ/를/는/은/는 ",
    description: "Express condition or hypothesis",
    type: "writing",
    timestamp: "5:45",
  },
  {
    id: "7",
    title: "~(으)ㄴ/는/은/는/는 ",
    description: "Express conjecture or possibility",
    type: "speaking",
    timestamp: "6:45",
  },
  {
    id: "8",
    title: "~(이)ㄹ/를/는/은/는 ",
    description: "Express contrast or unexpectedness",
    type: "writing",
    timestamp: "7:45",
  },
];

export function Grammar({
  type,
  onGrammarClick,
  disabled,
}: {
  type: string;
  onGrammarClick: (grammar: string, timestamp?: string) => void;
  disabled?: boolean;
}) {
  return (
    <TooltipProvider>
      <ScrollArea className={type === "level" ? "h-[600px]" : "h-[400px]"}>
        <div className="space-y-4 p-4">
          {grammarRules.map((rule) => {
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
