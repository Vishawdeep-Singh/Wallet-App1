
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
    props.isMainImage ? 'absolute md:top-[15rem] md:left-[45rem] w-[10rem] h-[10rem] md:w-[700px] md:h-[500px] rounded-3xl' : 'rounded-3xl w-[13rem] h-[13rem] md:w-[495px] md:h-[500px]'
  }`}></motion.img>
};

