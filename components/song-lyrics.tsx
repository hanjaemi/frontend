"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/music-player"

interface LyricLine {
  id: number
  text: string
  translation: string
  grammar: string
}

// This is a mock function. In a real application, you'd fetch the lyrics from an API.
function getLyrics(songTitle: string): LyricLine[] {
  return [
    {
      id: 1,
      text: "안녕하세요 여러분",
      translation: "Hello everyone",
      grammar: "안녕하세요 is a formal greeting in Korean.",
    },
    {
      id: 2,
      text: "오늘은 좋은 날씨네요",
      translation: "The weather is nice today",
      grammar: "~네요 is used to express a soft assertion or observation.",
    },
    {
      id: 3,
      text: "한국어 배우기",
      translation: "Learning Korean",
      grammar: "~기 is used to turn a verb into a noun (gerund).",
    },
    {
      id: 4,
      text: "정말 재미있어요",
      translation: "It's really fun",
      grammar: "~어요 is a polite way to end a sentence.",
    },
    {
      id: 5,
      text: "열심히 공부해서",
      translation: "By studying hard",
      grammar: "~해서 is used to connect two clauses, indicating cause and effect.",
    },
    {
      id: 6,
      text: "실력이 늘어갑니다",
      translation: "Skills are improving",
      grammar: "~ㅂ니다 is a formal way to end a sentence.",
    },
  ]
}

export function SongLyrics({ songTitle }: { songTitle: string }) {
  const lyrics = getLyrics(songTitle)
  const [selectedLine, setSelectedLine] = useState<LyricLine | null>(null)

  const handleLineClick = (line: LyricLine) => {
    setSelectedLine(line)
  }

  // This would be the actual audio file URL in a real application
  const audioSrc = "https://example.com/song.mp3"

  return (
    <div className="space-y-4">
      <MusicPlayer audioSrc={audioSrc} />
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <h2 className="mb-4 text-2xl font-bold">{songTitle}</h2>
        {lyrics.map((line) => (
          <Button
            key={line.id}
            variant="ghost"
            className="w-full justify-start p-2 text-left"
            onClick={() => handleLineClick(line)}
          >
            {line.text}
          </Button>
        ))}
      </ScrollArea>
      {selectedLine && (
        <div className="mt-4 rounded-md border p-4">
          <h3 className="mb-2 text-lg font-semibold">Translation</h3>
          <p>{selectedLine.translation}</p>
          <h3 className="mb-2 mt-4 text-lg font-semibold">Grammar Explanation</h3>
          <p>{selectedLine.grammar}</p>
        </div>
      )}
    </div>
  )
}

