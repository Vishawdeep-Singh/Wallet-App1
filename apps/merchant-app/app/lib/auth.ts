import db from '@repo/db/client';

import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { ServerSessionMerchentUser } from '@repo/interfaces/interfaces';
import jwt from 'jsonwebtoken';

// Define the type for credentials

interface ExtendedSession extends Session {
  user: ServerSessionMerchentUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token-merchant-app',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
    },
  },
  secret: process.env.JWT_SECRET || 'secret',
  callbacks: {
    async signIn({ user }) {
      console.log(db);

      const isExist = await db.merchant.findUnique({
        where: {
          email: user.email as string,
        },
      });
      if (isExist) {
        return true;
      }

      const response = await db.merchant.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
      if (!response) {
        return false;
      }
      return true;
    },
    // async redirect(){
    //   return "http://localhost:3003/dashboard"
    // },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        // Log the user object to confirm it contains the number field
        console.log('User in JWT callback:', user);

        const jwtToken = jwt.sign(
          {
            sub: user.id,
            name: user.name,
            email: user.email,
            number: user.number,
          },
          process.env.JWT_SECRET as string
        );

        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = jwtToken;
      }
      console.log('Token in JWT callback:', token);
      return token;
    },
    async session({ session, token }) {
      const newSession: ExtendedSession = session as ExtendedSession;

      if (token) {
        newSession.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
        };
      }
      console.log('New Session        ', newSession);
      return newSession;
    },
  },
};
