"use client"
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { signOut, useSession ,signIn} from "next-auth/react";

export default function Home() {
  const session = useSession();
  return <div>
    <button onClick={async()=>{
      await signOut()
    }} className="p-5">
      Sign Out
    </button>
    <button onClick={async()=>{
      await signIn()
    }} className="p-5">
      Sign In
    </button>

    <div>
      {JSON.stringify(session)}
    </div>
  </div>
}
