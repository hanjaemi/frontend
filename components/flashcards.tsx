"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Repeat } from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

const flashcards: Flashcard[] = [
  {
    id: "1",
    front: "안녕하세요",
    back: "Hello (formal)",
  },
  {
    id: "2",
    front: "감사합니다",
    back: "Thank you (formal)",
  },
  {
    id: "3",
    front: "미안합니다",
    back: "I'm sorry (formal)",
  },
];

export function Flashcards({ level }: { level: string }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const previousCard = () => {
    setCurrentCard(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  return (
    <div className="flex h-[780px] flex-col items-center justify-center gap-8">
      <div className="text-sm text-muted-foreground">
        Card {currentCard + 1} of {flashcards.length}
      </div>
      <Card
        className="h-64 w-full max-w-md cursor-pointer transition-all"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardContent className="flex h-full items-center justify-center p-6 text-2xl">
          {isFlipped
            ? flashcards[currentCard].back
            : flashcards[currentCard].front}
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" onClick={previousCard}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <Repeat className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextCard}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
