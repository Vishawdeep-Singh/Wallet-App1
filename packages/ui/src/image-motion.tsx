
"use client";
import { motion, Variants } from "framer-motion";

export const ImageMotion = ({ children }: { children: React.ReactNode }) => {
  return <motion.img 
  initial={{ opacity: 0,scale:1.3 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
   duration:1,
   ease:"easeInOut",
   delay:1
  }}
  
  src="/people.jpg" alt="People photo" className=" absolute top-[15rem] left-[45rem] w-[700px] h-[500px] rounded-3xl"></motion.img>
};

