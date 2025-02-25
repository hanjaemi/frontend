import { NextResponse } from "next/server";

// This is a temporary mock data function. Replace this with your actual database query
async function getStudyDataFromDatabase(id: string) {
  // Mock data - replace this with actual database queries
  return {
    grammar: [
      {
        id: "1",
        title: "~(이)ㄹ/를 수 있다",
        description: "Express ability to do something",
        type: "writing",
        timestamp: "1:20",
      },
      {
        id: "2",
        title: "~(이)ㄹ/를 수 없다",
        description: "Express inability to do something",
        type: "speaking",
        timestamp: "1:30",
      },
      // Add more grammar items as needed
    ],
    vocabulary: [
      {
        id: "1",
        word: "도와주세요",
        meaning: "Please help me",
        type: "important",
        timestamp: "0:05",
      },
      {
        id: "2",
        word: "저는",
        meaning: "I am (polite)",
        type: "common",
        timestamp: "1:15",
      },
      // Add more vocabulary items as needed
    ],
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getStudyDataFromDatabase(params.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching study data:", error);
    return NextResponse.json(
      { error: "Failed to fetch study data" },
      { status: 500 }
    );
  }
}
