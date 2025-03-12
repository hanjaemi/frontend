"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: "1",
    question: "Which is the correct formal way to say 'hello'?",
    options: ["안녕", "안녕하세요", "안녕히 가세요", "안녕히 계세요"],
    correctAnswer: 1,
  },
  {
    id: "2",
    question: "What is the meaning of '감사합니다'?",
    options: ["Hello", "Goodbye", "Thank you", "I'm sorry"],
    correctAnswer: 2,
  },
  {
    id: "3",
    question: "Which particle is used to mark the subject of a sentence?",
    options: ["을/를", "이/가", "은/는", "에서"],
    correctAnswer: 1,
  },
  {
    id: "4",
    question: "What is the correct way to say 'I like something' in Korean?",
    options: [
      "저는 ~을/를 좋아합니다",
      "~을/를 좋아합니다",
      "저는 ~을/를 좋아요",
      "~을/를 좋아요",
    ],
    correctAnswer: 0,
  },
  {
    id: "5",
    question: "What is the meaning of the Korean word '도서관'?",
    options: ["Library", "School", "University", "Bookstore"],
    correctAnswer: 0,
  },
  {
    id: "6",
    question: "What is the correct way to say 'What is your name?' in Korean?",
    options: [
      "당신의 이름은 무엇입니까?",
      "당신의 이름은?",
      "당신의 이름을 알려주세요",
      "당신의 이름을",
    ],
    correctAnswer: 0,
  },
];

export function Test({ level }: { level: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
  };

  const getScore = () => {
    return Object.entries(answers).reduce((score, [questionId, answer]) => {
      const question = questions.find((q) => q.id === questionId);
      return score + (question?.correctAnswer === answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="flex flex-col h-full rounded-lg">
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="py-3">
                <CardTitle className="text-base">{question.question}</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <RadioGroup
                  onValueChange={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: Number.parseInt(value),
                    }))
                  }
                  value={answers[question.id]?.toString()}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`${question.id}-${index}`}
                        disabled={showResults}
                      />
                      <Label htmlFor={`${question.id}-${index}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {showResults && (
                  <div className="mt-2 text-sm">
                    {answers[question.id] === question.correctAnswer ? (
                      <p className="text-green-500">Correct!</p>
                    ) : (
                      <p className="text-red-500">
                        Incorrect. The correct answer is:{" "}
                        {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {showResults && (
            <Card>
              <CardContent className="p-4">
                <p className="text-lg font-semibold">
                  Your Score: {getScore()} out of {questions.length}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
      {!showResults && (
        <Button
          className="h-9"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
        >
          Submit Test
        </Button>
      )}
    </div>
  );
}
