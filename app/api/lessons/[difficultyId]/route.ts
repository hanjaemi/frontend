import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { difficultyId: string } }
) {
  try {
    const { difficultyId } = params;
    const base = process.env.BACKEND_URL;
    
    const response = await fetch(`${base}/difficulty/${difficultyId}/lessons`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lessons for difficulty ${difficultyId}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}
