// app/api/raffles/route.ts
import { NextResponse } from 'next/server';

type RaffleStatus = 'active' | 'successful' | 'failed';

const raffles = [
  {
    raffleId: '22211bdba82c0251fed0a1301be40ae379790db99d769f291dceacdbc6a2fa7c',
    name: 'Raffle 1',
    description: 'Raffle 1 description',
    image: 'https://example.com/image.png',
    collectingTokenId: 'b2dcea48caf0e73309138d659f6eb69d7ec8793dee989670c72dd4ffde7ebeb3',
    winnersCount: 2,
    giftCount: 5,
    tags: ['tag1', 'tag2', 'tag3'],
    deadline: 1718284800,
    goal: 1234567890,
    ticketPrice: 1000,
    soldTicketCount: 56,
    status: 'active' as RaffleStatus
  },
  {
    raffleId: 'raffle-2',
    name: 'Raffle 2',
    description: 'Finished raffle',
    image: 'https://example.com/image2.png',
    collectingTokenId: '01c4809f78c0210e4d1406e025abf27ef8df51639355184e8ac891fa9e6d201b',
    winnersCount: 1,
    giftCount: 1,
    tags: ['history'],
    deadline: 1700000000,
    goal: 500000000,
    ticketPrice: 500,
    soldTicketCount: 500,
    status: 'successful' as RaffleStatus
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = Number(searchParams.get('pageSize') ?? 10);
  const status = searchParams.get('status') as RaffleStatus | null;

  const filtered = status && status !== null ? raffles.filter((r) => r.status === status) : raffles;

  const start = (page - 1) * pageSize;
  const pagedItems = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    total: filtered.length,
    items: pagedItems
  });
}
