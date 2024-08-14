import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from 'next-auth';
import { ServerSessionUser } from "@repo/interfaces/interfaces";

// Define the type for credentials

interface ExtendedSession extends Session {
  user: ServerSessionUser;
}
// Define the type for the session
interface SessionUser {
    name: string;
    email: string;
    image?: string | undefined; // Optional as it can be undefined
    id?: string;    // Optional as it can be undefined
    number?:string
  }
  interface User1{
    id:string;
    name:string;
    email:string;
    number:string
  }
  
  
interface UserToken {
    name: string;
    email: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
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
    async jwt({ token, user }:{token:JWT,user:any}) {
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
    async session({ session, token}) {
      
      const newSession: ExtendedSession = session as ExtendedSession;
      // Attach the user ID to the session object
      if (token) {
        newSession.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          number: token.number as string // Ensure the number field is included in the session
        };
      }
      console.log("New Session        ",newSession)
      return newSession;
    },
    
  },
  pages:{
    signIn:"/signin"
  }
};
