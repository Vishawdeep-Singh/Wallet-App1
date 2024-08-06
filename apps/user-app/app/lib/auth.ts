import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";

// Define the type for credentials
interface Credentials {
  phone: string;
  password: string;
}

// Define the type for the session
interface SessionUser {
    name: string;
    email: string;
    image: string | undefined; // Optional as it can be undefined
    id?: string;    // Optional as it can be undefined
  }
  
  interface Session {
    user: SessionUser;
    expires: string; // ISO 8601 date string
  }
interface UserToken {
    name: string;
    email: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
  }

  interface SessionProps {
    session : Session;
    token:UserToken
  }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials:any) {
        // Check if the credentials exist
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials?.phone
          }
        });

        if (existingUser) {
            console.log(existingUser.number)
          // Compare the provided password with the stored hashed password
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              number:existingUser.number

              
            } ;
          }
          
        }

        return null;
      },
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }:any) {
        if (user) {
          // Log the user object to confirm it contains the number field
          console.log('User in JWT callback:', user);
          
          token.sub = user.id;
          token.name = user.name;
          token.email = user.email;
          token.number = user.number; // Add number to the token
        }
        console.log('Token in JWT callback:', token);
        return token;
      },
    async session({ session, token}: { session: any; token: JWT }) {
      // Attach the user ID to the session object
      if (token) {
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          number: token.number as string // Ensure the number field is included in the session
        };
      }
      return session;
    },
    
  },
  pages:{
    signIn:"/signin"
  }
};
