import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { difficultyId: string; lessonId: string } }
) {
  try {
    const base = process.env.BACKEND_URL;
    const res = await fetch(`${base}/difficulty/${params.difficultyId}/lessons/${params.lessonId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Backend API error: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { message: 'Failed to fetch lesson data' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Lesson API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}