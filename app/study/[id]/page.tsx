"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Grammar } from "@/components/grammar";
import { Vocabulary } from "@/components/vocabulary";
import { Chat } from "@/components/chat";
import { Flashcards } from "@/components/flashcards";
import { Summary } from "@/components/summary";
import { Test } from "@/components/exam";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { fetchLessonData, Lesson } from "@/data/dataService";

export default function LevelPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [selectedGrammar, setSelectedGrammar] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // For now, we're focusing on lesson 1, but this can be extended for multiple lessons
  const currentLesson = lessonData;

  const handleGrammarClick = useCallback((grammar: string) => {
    setSelectedGrammar(grammar);
  }, []);

  const handleWordClick = useCallback((word: string) => {
    setSelectedWord(word);
  }, []);

  useEffect(() => {
    const loadLessonData = async () => {
      try {
        setIsLoading(true);
        // Fetch lesson 1 for the specified difficulty
        const data = await fetchLessonData(params.id, "1");
        console.log("Fetched lesson data:", data);
        if (data) {
          setLessonData(data);
        } else {
          console.error(`No data found for difficulty ${params.id}, lesson 1`);
        }
      } catch (error) {
        console.error("Error loading lesson data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLessonData();
  }, [params.id]);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-h-screen py-3 px-4">
      <div className="flex items-center mb-2">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="h-8 px-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-center p-2 bg-muted rounded-md">
          <h2 className="text-lg font-semibold">
            {lessonData ? `Lesson ${lessonData.number}: ${lessonData.title}` : 'Loading...'}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 flex-1 overflow-hidden lg:grid-cols-2">
        <Card className="p-3 flex flex-col overflow-hidden">
          <Tabs defaultValue="grammar" className="flex flex-col h-full">
            <TabsList className="w-full">
              <TabsTrigger value="grammar">Grammar</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            </TabsList>
            <TabsContent value="grammar" className="flex-1 overflow-auto">
              <Grammar
                type="level"
                id={params.id}
                onGrammarClick={handleGrammarClick}
                disabled={isChatLoading}
                data={currentLesson?.grammar || []}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="vocabulary" className="flex-1 overflow-auto">
              <Vocabulary
                type="level"
                id={params.id}
                onWordClick={handleWordClick}
                disabled={isChatLoading}
                data={currentLesson?.vocabulary || []}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="p-3 flex flex-col overflow-hidden">
          <Tabs defaultValue="chat" className="flex flex-col h-full">
            <TabsList className="w-full">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 overflow-auto">
              <Chat
                level={params.id}
                selectedGrammar={selectedGrammar}
                selectedWord={selectedWord}
                onLoadingChange={setIsChatLoading}
              />
            </TabsContent>
            <TabsContent value="flashcards" className="flex-1 overflow-auto">
              <Flashcards
                level={params.id}
                vocabulary={currentLesson?.vocabulary || []}
                grammar={currentLesson?.grammar || []}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="summary" className="flex-1 overflow-auto">
              <Summary level={params.id} />
            </TabsContent>
            <TabsContent value="test" className="flex-1 overflow-auto">
              <Test level={params.id} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
