import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { geolocation } from '@vercel/functions';

const BLOCKED_COUNTRIES = new Set(['IR', 'KP', 'SY', 'CU']);

export function middleware(request: NextRequest) {
  const { country } = geolocation(request);

  if (country && BLOCKED_COUNTRIES.has(country)) {
    return new NextResponse('Access denied in your region', { status: 403 });
  }

  return NextResponse.next();
}
