"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { YoutubeVideo } from "@/components/youtube-video";
import { SongLyrics } from "@/components/song-lyrics";
import { Grammar } from "@/components/grammar";
import { Vocabulary } from "@/components/vocabulary";
import { Chat } from "@/components/chat";
import { Flashcards } from "@/components/flashcards";
import { Summary } from "@/components/summary";
import { Test } from "@/components/test";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StudyPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;
  const router = useRouter();
  const [selectedGrammar, setSelectedGrammar] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (type === "youtube") {
      localStorage.setItem("lastYouTubeVideoId", id);
    } else if (type === "song") {
      localStorage.setItem("lastSongTitle", decodeURIComponent(id));
    }
  }, [type, id]);

  const handleBack = () => {
    if (type === "youtube") {
      localStorage.removeItem("lastYouTubeVideoId");
      router.push("/youtube");
    } else if (type === "song") {
      localStorage.removeItem("lastSongTitle");
      router.push("/songs");
    }
  };

  const handleGrammarClick = useCallback(
    (grammar: string, timestamp?: string) => {
      if (isChatLoading) return;
      setSelectedGrammar(null); // Reset first to ensure the effect triggers
      setTimeout(() => {
        setSelectedGrammar(grammar);
        if (timestamp && videoRef.current) {
          const seconds = convertTimestampToSeconds(timestamp);
          const iframe = videoRef.current as HTMLIFrameElement & {
            contentWindow: {
              postMessage: (message: any, target: string) => void;
            };
          };
          iframe.contentWindow.postMessage(
            { event: "command", func: "seekTo", args: [seconds] },
            "*"
          );
        }
      }, 0);
    },
    [isChatLoading]
  );

  const handleWordClick = useCallback(
    (word: string, timestamp?: string) => {
      if (isChatLoading) return;
      setSelectedWord(null); // Reset first to ensure the effect triggers
      setTimeout(() => {
        setSelectedWord(word);
        if (timestamp && videoRef.current) {
          const seconds = convertTimestampToSeconds(timestamp);
          const iframe = videoRef.current as HTMLIFrameElement & {
            contentWindow: {
              postMessage: (message: any, target: string) => void;
            };
          };
          iframe.contentWindow.postMessage(
            { event: "command", func: "seekTo", args: [seconds] },
            "*"
          );
        }
      }, 0);
    },
    [isChatLoading]
  );

  const convertTimestampToSeconds = (timestamp: string): number => {
    const [minutes, seconds] = timestamp.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
      </Button>
      <h1 className="mb-8 text-3xl font-bold">
        {type === "youtube" ? "YouTube Video Study" : "Song Lyrics Study"}
      </h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-4">
            {type === "youtube" ? (
              <YoutubeVideo videoId={id} ref={videoRef} />
            ) : (
              <SongLyrics songTitle={decodeURIComponent(id)} />
            )}
          </Card>
          {type === "youtube" && (
            <Card className="flex flex-col">
              <Tabs defaultValue="grammar" className="flex flex-col flex-1">
                <TabsList className="w-full">
                  <TabsTrigger value="grammar">Grammar</TabsTrigger>
                  <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                </TabsList>
                <TabsContent value="grammar" className="flex-1 mt-0">
                  <Grammar
                    type={type}
                    id={id}
                    onGrammarClick={handleGrammarClick}
                    disabled={isChatLoading}
                  />
                </TabsContent>
                <TabsContent value="vocabulary" className="flex-1 mt-0">
                  <Vocabulary
                    type={type}
                    id={id}
                    onWordClick={handleWordClick}
                    disabled={isChatLoading}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
        <Card className="p-4  ">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1">
              <Chat
                level={id}
                selectedGrammar={selectedGrammar}
                selectedWord={selectedWord}
                onLoadingChange={setIsChatLoading}
              />
            </TabsContent>
            <TabsContent value="flashcards">
              <Flashcards level={id} />
            </TabsContent>
            <TabsContent value="summary" className="flex-1 mt-0">
              <Summary level={id} />
            </TabsContent>
            <TabsContent value="test" className="flex-1 mt-0">
              <Test level={id} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
