"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Search } from "lucide-react";

export default function SongAnalysis() {
  const [songTitle, setSongTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedSongTitle = localStorage.getItem("lastSongTitle");
    if (savedSongTitle) {
      router.push(`/study/song/${encodeURIComponent(savedSongTitle)}`);
    }
  }, [router]);

  const handleAnalyze = () => {
    if (songTitle.trim()) {
      localStorage.setItem("lastSongTitle", songTitle);
      router.push(`/study/song/${encodeURIComponent(songTitle)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  const getSongDataFromDatabase = async () => {
    try {
      const response = await fetch(`http://192.168.0.124:8080/flashcards`);
      if (!response.ok) {
        throw new Error("Failed to fetch song data");
      }
      const data = await response.clone().json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching song data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getSongDataFromDatabase();
  }, []);

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">
          What song would you like to learn from?
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Music className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            className="pl-10 pr-20 h-14 text-lg bg-muted/40"
            placeholder="Enter Korean song title..."
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
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
          Press Enter or click Analyze to start learning from the song
        </p>
      </div>
    </div>
  );
}
