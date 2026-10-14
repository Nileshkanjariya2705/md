import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(true);
  } catch {
    return NextResponse.json(false, { status: 500 });
  }
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
