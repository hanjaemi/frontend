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
import { Test } from "@/components/test";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LevelPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [selectedGrammar, setSelectedGrammar] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [studyData, setStudyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const currentLesson = useMemo(() => {
    if (!selectedLesson || !studyData?.lessons) return studyData?.lessons?.[0];
    return studyData.lessons.find(
      (lesson: any) => lesson.id === selectedLesson
    );
  }, [selectedLesson, studyData]);

  const handleGrammarClick = useCallback((grammar: string) => {
    setSelectedGrammar(grammar);
  }, []);

  const handleWordClick = useCallback((word: string) => {
    setSelectedWord(word);
  }, []);

  // const fetchStudyData = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/level/${params.id}`);
  //     const data = await response.json();
  //     setStudyData(data);
  //   } catch (error) {
  //     console.error("Error fetching study data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [params.id]);

  // useEffect(() => {
  //   fetchStudyData();
  // }, [fetchStudyData]);

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] max-h-screen py-3 px-4">
      <div className="flex items-center mb-2">
        <Button variant="ghost" onClick={() => router.back()} className="h-8 px-2">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
      </div>

      <div className="mb-3">
        <Tabs
          defaultValue={studyData?.lessons?.[0]?.id}
          onValueChange={setSelectedLesson}
        >
          <TabsList className="w-full">
            {studyData?.lessons?.map((lesson: any) => (
              <TabsTrigger key={lesson.id} value={lesson.id}>
                Lesson {lesson.number}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
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
              />
            </TabsContent>
            <TabsContent value="flashcards" className="flex-1 overflow-auto">
              <Flashcards level={params.id} />
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
