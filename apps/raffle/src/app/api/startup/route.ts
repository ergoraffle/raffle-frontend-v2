import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    txFee: 150000,
    version: '1.0.0',
    verifiedTokens: [
      {
        tokenId: 'b2dcea48caf0e73309138d659f6eb69d7ec8793dee989670c72dd4ffde7ebeb3',
        name: 'rsBTC'
      },
      {
        tokenId: '01c4809f78c0210e4d1406e025abf27ef8df51639355184e8ac891fa9e6d201b',
        name: 'rsETH'
      }
    ]
  });
}
