import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { difficultyId: string } }
) {
  try {
    const res = await fetch(`http://3.35.22.146:8080/lessons?difficultyId=${params.difficultyId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Backend API error: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { message: 'Failed to fetch lessons' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Lessons API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
