import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['http://localhost:3000']

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const preflightHeaders = new Headers(corsHeaders)

    if (isAllowedOrigin) {
      preflightHeaders.set('Access-Control-Allow-Origin', origin)
    }

    return new NextResponse(null, {
      status: 204,
      headers: preflightHeaders,
    })
  }

  // Handle actual requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*', // Apply this middleware to API routes
}
