import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    lastBlockHeight: 123456,
    health: 'healthy',
    serviceFee: 30,
    implementerFee: 20,
    creationFee: 20000000000
  });
}
