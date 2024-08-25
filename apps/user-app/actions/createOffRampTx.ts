'use server';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/lib/auth';
import { ServerSessionUser } from '@repo/interfaces/interfaces';
import axios from 'axios';
import bcrypt from 'bcrypt';

export const offRampTx = async (amount: Number) => {
  try {
    const session: {
      user: ServerSessionUser;
    } | null = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
      return {
        message: 'Unauthenticated Request',
      };
    }

    const { data: tokenResponse } = await axios.post(
      'http://bank-app:3000/api/getToken',
      { accessToken: session.user.accessToken, time: new Date() }
    );
    const hashedToken = await bcrypt.hash(tokenResponse.token, 10);
    const newTx = await prisma.offRampTransaction.create({
      data: {
        provider: 'Dummy Bank',
        status: 'Processing',
        startTime: new Date(),
        amount: Number(amount),
        userId: Number(session?.user?.id),
        token: tokenResponse.token,
      },
    });

    return {
      message: 'Done',
      token: hashedToken,
      txId: newTx.id,
    };
  } catch (error) {
    // Log and handle errors appropriately
    console.error('Error in createOffRamp:', error);

    // Check if the error is an Axios error or other types
    if (axios.isAxiosError(error)) {
      return {
        message: `API request failed: ${error.message || error.response?.data.message}`,
      };
    } else if (error instanceof Error) {
      return { message: `An error occurred: ${error.message}` };
    } else {
      return { message: 'An unknown error occurred in creating Off Ramp' };
    }
  }
};
