"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { FaWallet } from "react-icons/fa6";
import { useSession , signOut} from "next-auth/react";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";


export const Appbar = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();
 

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  const [isOpen, setIsOpen] = useState(false);

  if(session.status==="loading"){
    return <Skeleton variant="rectangular" width={2000} height={64} />
  }

  

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="h-16 p-7 flex bg-slate-100 items-center w-[100%] z-20 fixed top-0 justify-between"
    >
      <div onClick={()=>{
        router.push("/")
      }} className="flex space-x-4 cursor-pointer items-center">
        <FaWallet size={45} />
        <div className="text-3xl font-mono font-extrabold text-black">
          Vault
        </div>
      </div>



      {session.status==="unauthenticated" && <div className="space-x-5">
      <motion.button
        onClick={()=>{
          router.push('/signin')
        }}
        className=" bg-white text-black border-[1px] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
      >
        Sign In
      </motion.button>
      <motion.button
         onClick={()=>{
          router.push('/signup')
        }}
        className=" bg-blue-600 text-white rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
      >
        Sign Up
      </motion.button>
      </div>}

      {session.status==="authenticated" &&   <motion.button
        onClick={async ()=>{
          await signOut({ redirect: false }); // Perform sign-out action
      router.push("/"); // Redirect after sign-out
        }}
        className=" bg-white text-black border-[1px] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
      >
        Sign Out
      </motion.button>}

      {session.status==="authenticated" && <motion.div
        className="flex flex-col"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
       
        <motion.button
         
          whileTap={{ scale: 0.7 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            variants={{
              open: { scale: 1.2, border:"black 2px solid",borderRadius:"50%" },
              closed: { scale: 1,borderRadius:"50%" }
            }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-[48px] h-[48px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </motion.button>

      
          <motion.ul
            className={`flex flex-col bg-slate-100  rounded-lg absolute top-[4.5rem] right-2  w-64 h-32 overflow-hidden`}
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3
                }
              }
            }}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <motion.li className="w-full p-2 font-bold text-left hover:bg-slate-200" variants={itemVariants}>Name : {session.data.user?.name}</motion.li>
            <motion.li className="w-full p-2 font-bold  text-left hover:bg-slate-200" variants={itemVariants}>Email : {session.data.user?.email}</motion.li>
            <motion.li className="w-full p-2 font-bold  text-left hover:bg-slate-200" variants={itemVariants}>Phone : {session.data.user?.number}</motion.li>
           
          </motion.ul>
      
      </motion.div> }

      

      
    </motion.div>
  );
};