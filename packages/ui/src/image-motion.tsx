
"use client";
import { motion, Variants } from "framer-motion";
interface imageMotionProps{
  src:string,
  isMainImage:boolean
}
export const ImageMotion = (props:imageMotionProps) => {
  return <motion.img 
  initial={{ opacity: 0,scale:1.3 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
   duration:1,
   ease:"easeInOut",
   delay:1
  }}
  
  src={props.src} alt="People photo" className={` ${
    props.isMainImage ? 'absolute top-[15rem] left-[45rem] w-[700px] h-[500px] rounded-3xl' : 'rounded-3xl w-[495px] h-[500px]'
  }`}></motion.img>
};

