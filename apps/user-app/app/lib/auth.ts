import db from '@repo/db/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { ServerSessionUser } from '@repo/interfaces/interfaces';
import jwt from 'jsonwebtoken';

// Define the type for credentials

interface ExtendedSession extends Session {
  user: ServerSessionUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: {
          label: 'Phone number',
          type: 'text',
          placeholder: '1231231231',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // Check if the credentials exist
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials?.phone,
          },
        });

        if (existingUser) {
          console.log(existingUser.number);
          // Compare the provided password with the stored hashed password
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              number: existingUser.number,
            };
          }
        }

        return null;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token-user-app',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV==="production",
      },
    },
  },
  secret: process.env.JWT_SECRET || 'secret',
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        // Log the user object to confirm it contains the number field
        console.log('User in JWT callback:', user);
        console.log('tokem in JWT callback:', token);

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
        token.number = user.number;
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
          number: token.number as string,
          accessToken: token.accessToken as string,
        };
      }
      console.log('New Session        ', newSession);
      return newSession;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
