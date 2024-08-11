"use client"
import { motion } from 'framer-motion';

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    
    <motion.div
    className="rounded-lg  p-10 shadow-lg border-[#c39def] border-8"
   
    initial={{ opacity: 0, y: 50 ,scale:0.7}}
        animate={{ opacity: 1, y: 0,scale:1 }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut", delay: 0 },
          y: { duration: 0.5, ease: "easeOut", delay: 0 },
          scale: { duration: 0.5, ease: "easeOut", delay: 0 },
        }}
        // whileHover={{ scale: 1.1,backgroundColor: "rgb(224 242 254)",
        //   transition:{duration:0.2,ease:"linear",delay:0}
        //  }}
       
  >
    {children}
  </motion.div>
  
  );
}

export function CardHeader({children}:{
  children: React.ReactNode;
}){
  return <div className="flex flex-col space-y-4">
    {children}
  </div>
}
export function CardTitle({children}:{
  children: React.ReactNode;
}){
  return <div className="text-3xl font-bold">
    {children}
  </div>
}
export function CardDescription({children}:{
  children: React.ReactNode;
}){
  return <div className="text-gray-600">
    {children}
  </div>
}
export function CardContent({children}:{
  children: React.ReactNode;
}){
  return <div className="pt-5">
    {children}
  </div>
}
export function CardFooter({children}:{
  children: React.ReactNode;
}){
  return <div>
    {children}
  </div>
}
