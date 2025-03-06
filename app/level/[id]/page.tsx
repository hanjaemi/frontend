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
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      {/* <h1 className="mb-8 text-3xl font-bold">Level {params.id}</h1> */}

      <div className="mb-6">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <Tabs defaultValue="grammar">
            <TabsList className="w-full">
              <TabsTrigger value="grammar">Grammar</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            </TabsList>
            <TabsContent value="grammar">
              <Grammar
                type="level"
                id={params.id}
                onGrammarClick={handleGrammarClick}
                disabled={isChatLoading}
                data={currentLesson?.grammar || []}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="vocabulary">
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
        <Card className="p-4">
          <Tabs defaultValue="chat">
            <TabsList className="w-full">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
            <TabsContent value="chat">
              <Chat
                level={params.id}
                selectedGrammar={selectedGrammar}
                selectedWord={selectedWord}
              />
            </TabsContent>
            <TabsContent value="flashcards">
              <Flashcards level={params.id} />
            </TabsContent>
            <TabsContent value="summary">
              <Summary level={params.id} />
            </TabsContent>
            <TabsContent value="test">
              <Test level={params.id} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
