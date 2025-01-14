import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const responses = await request.json();
  console.log('Received responses:', responses);
  return NextResponse.json({ message: 'Responses submitted successfully!' });
}
