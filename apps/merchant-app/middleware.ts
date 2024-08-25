import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Origin': '*' // Allow all origins
}

export function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const preflightHeaders = new Headers(corsHeaders)

    return new NextResponse(null, {
      status: 204,
      headers: preflightHeaders,
    })
  }

  // Handle actual requests
  const response = NextResponse.next()
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*', // Apply this middleware to API routes
}
