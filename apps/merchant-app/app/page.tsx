import { ServerSessionMerchentUser } from "@repo/interfaces/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";



export default async function Home() {
  const session: { user: ServerSessionMerchentUser } | null = await getServerSession(authOptions);
  if(!session?.user){
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent('https://vault.merchant-app.vishawdeepsingh.in/dashboard')}`
    );
  }
  else{
    redirect('/dashboard')
  }

  
}
