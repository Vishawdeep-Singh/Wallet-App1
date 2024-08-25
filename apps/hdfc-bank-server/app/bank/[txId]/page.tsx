import bcrypt from 'bcrypt';
import db from '@repo/db/client';

import CardForm from '../../../components/DummyBankFrom';
import jwt from 'jsonwebtoken';

async function validateToken(token: string, txId: string) {
  try {
    // Retrieve the token from the database based on txId
    const realTokenRecord = await db.onRampTransaction.findUnique({
      where: {
        id: Number(txId),
      },
      select: {
        token: true,
      },
    });

    if (!realTokenRecord) {
      return { error: 'Transaction record not found.' };
    }
    const decodedtoken = decodeURIComponent(token);
    console.log('Bank token db         ', realTokenRecord.token);
    console.log('Hashed token db         ', decodedtoken);

    const isValid = await bcrypt.compare(realTokenRecord.token, decodedtoken);

    if (!isValid) {
      return { error: 'Invalid token. The token is not valid or has expired.' };
    }

    const decode: any = jwt.verify(
      realTokenRecord.token,
      process.env.JWT_SECRET as string
    );

    return {
      valid: true,
      tokenInfo: decode.info,
      token: realTokenRecord.token,
    };
  } catch (error: any) {
    console.error('Error in token validation:', error);
    return {
      error:
        'An unexpected error occurred. Please try again later.' + error.message,
    };
  }
}

export default async function MyPage({
  params,
  searchParams,
}: {
  params: { txId: string };
  searchParams: { token: string; amount: string };
}) {
  const { txId } = params;
  const { token, amount } = searchParams;
  console.log(token);

  const validation = await validateToken(token, txId);

  if (validation.error) {
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        <h1>Error</h1>
        <p>{validation.error}</p>
      </div>
    );
  }

  if (validation.valid) {
    return (
      <CardForm
        amount={amount}
        token={validation.token}
        txId={txId}
        tokenInfo={validation.tokenInfo}
      ></CardForm>
    );
  }
}
