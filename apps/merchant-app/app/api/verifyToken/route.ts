import { NextRequest, NextResponse } from 'next/server';
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';

interface DecodedPayLoad {
  id: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }
    const decode = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    );
    console.log(decode);
    return NextResponse.json(
      {
        merchantDetails: {
          ...(decode as DecodedPayLoad),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      // Handle general JWT errors (invalid or malformed token)
      return NextResponse.json({ error: 'Invalid JWT token' }, { status: 401 });
    } else if (error instanceof TokenExpiredError) {
      // Handle token expiration
      return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
    } else if (error instanceof NotBeforeError) {
      // Handle tokens not yet valid
      return NextResponse.json(
        { error: 'Token is not yet valid' },
        { status: 401 }
      );
    } else if (error instanceof SyntaxError) {
      // Handle invalid JSON format
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    } else {
      // Handle unexpected errors
      console.error(error); // Log the error for debugging purposes
      return NextResponse.json(
        { error: 'Internal server error' + error },
        { status: 500 }
      );
    }
  }
}
