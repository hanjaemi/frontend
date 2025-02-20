"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, Search } from "lucide-react";

export default function YouTubeAnalysis() {
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedVideoId = localStorage.getItem("lastYouTubeVideoId");
    if (savedVideoId) {
      router.push(`/study/youtube/${savedVideoId}`);
    }
  }, [router]);

  const handleAnalyze = () => {
    try {
      const videoId = new URL(videoUrl).searchParams.get("v");
      if (videoId) {
        localStorage.setItem("lastYouTubeVideoId", videoId);
        router.push(`/study/youtube/${videoId}`);
      }
    } catch (error) {
      console.error("Invalid URL:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">
          What would you like to learn from?
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            className="pl-10 pr-20 h-14 text-lg bg-muted/40"
            placeholder="Paste YouTube video URL here..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="absolute right-2 top-2 bottom-2"
            onClick={handleAnalyze}
          >
            <Search className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Press Enter or click Analyze to start learning from the video
        </p>
      </div>
    </div>
  );
}
