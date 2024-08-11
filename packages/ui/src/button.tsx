"use client";

import { ReactNode } from "react";
import {motion} from "framer-motion"

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onClick?: ()=>void
}

export const Button = ({ children, className, appName,onClick }: ButtonProps) => {
  return (
    <motion.button onClick={onClick} className="text-sm p-2 mt-4 text-center text-[#5640d7] border-2 border-[#5640d7] rounded-lg" 
    whileHover={{ scale: 1.2 , backgroundColor:"#5640d7",color:"white" }}
    
    >
      
      {children}
    </motion.button>
  );
};
