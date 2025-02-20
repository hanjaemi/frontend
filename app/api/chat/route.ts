import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: body.messages,
      max_tokens: 1000,
    });

    return NextResponse.json(completion);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}
