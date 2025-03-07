"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Repeat } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  type: "vocabulary" | "grammar";
}

export function FlashcardsLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="text-sm text-muted-foreground">
        <Skeleton width={100} />
      </div>
      <Card className="w-[90%] max-w-[400px] h-[250px]">
        <CardContent className="flex items-center justify-center h-full">
          <Skeleton width={200} height={30} />
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Skeleton width={40} height={40} circle />
        <Skeleton width={40} height={40} circle />
        <Skeleton width={40} height={40} circle />
      </div>
    </div>
  );
}

export function Flashcards({
  level,
  vocabulary,
  grammar,
  isLoading,
}: {
  level: string;
  vocabulary?: Array<{ id: string; word: string; meaning: string }>;
  grammar?: Array<{ id: string; title: string; description: string }>;
  isLoading?: boolean;
}) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "vocabulary" | "grammar">(
    "all"
  );

  if (isLoading) {
    return <FlashcardsLoading />;
  }

  const vocabularyCards: Flashcard[] =
    vocabulary?.map((item) => ({
      id: item.id,
      front: item.word,
      back: item.meaning,
      type: "vocabulary",
    })) || [];

  const grammarCards: Flashcard[] =
    grammar?.map((item) => ({
      id: item.id,
      front: item.title,
      back: item.description,
      type: "grammar",
    })) || [];

  const allCards = [...vocabularyCards, ...grammarCards];

  const flashcards =
    activeTab === "all"
      ? allCards
      : activeTab === "vocabulary"
      ? vocabularyCards
      : grammarCards;

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

  if (flashcards.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-muted-foreground">
          {activeTab === "all"
            ? "No flashcards available"
            : `No ${activeTab} cards available`}
        </p>
      </div>
    );
  }

  const currentType = flashcards[currentCard].type;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "all" | "vocabulary" | "grammar");
          setCurrentCard(0);
          setIsFlipped(false);
        }}
        className="max-w-[400px]"
      >
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="text-sm text-muted-foreground flex flex-col items-center">
        <div>
          Card {currentCard + 1} of {flashcards.length}
        </div>
      </div>

      <div className="perspective-1000 flex-grow flex items-center justify-center">
        <Card
          className="w-[90%] max-w-[400px] h-[250px] cursor-pointer transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "",
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="absolute w-full h-full backface-hidden">
            <CardContent className="flex items-center justify-center h-full p-4 text-xl">
              {flashcards[currentCard].front}
            </CardContent>
          </div>
          <div
            className="absolute w-full h-full backface-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            <CardContent className="flex items-center justify-center h-full p-4 text-xl">
              {flashcards[currentCard].back}
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="flex gap-4 pb-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={previousCard}
          disabled={flashcards.length <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <Repeat className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={nextCard}
          disabled={flashcards.length <= 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
