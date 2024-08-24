// pages/api/custom-signin.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export   async function POST(req: NextRequest) {
 

  const { accessToken , time} = await req.json();
  if (!accessToken) {
    return NextResponse.json(
        { message: 'Access Token is required' },
        { status: 400 }
      );
  }



try {
   
    const decode = await jwt.verify(accessToken,process.env.JWT_SECRET as string)

  const token = await jwt.sign({info:decode,time:time}, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
 
  return NextResponse.json({ token:token },{status:200});
  } catch (error:any) {
    console.error('Verification Error:', error);
    return NextResponse.json({message:"Error in verifying token , Unauthenticated Request"+"      "+error.message},{status:401})
  }

 

 

  // Generate a token (you can customize the payload and secret)
 

  // Send the token back to the client (you can also set it as a cookie)
  
}
