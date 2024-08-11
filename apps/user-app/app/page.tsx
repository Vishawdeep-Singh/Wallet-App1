
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useBalance } from "@repo/store/useBalance";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaWallet } from "react-icons/fa6";
import { Appbar } from "@repo/ui/appbar";
import { motion } from "framer-motion";
import "./page.module.css"
import {ImageMotion} from "@repo/ui/image-motion"

export default function LandingPage() {
 
       return<div className="bg-[#faf3f4]">
         

         <div className=" srcoll-smooth overflow-y-auto relative">
          <div className="bg-[#DEEFFF] font-normal w-[70%] text-8xl h-[700px] p-24 ml-24 mr-[316px] mt-24 rounded-[2rem]">
            <div className="w-[50%] h-[100%] flex flex-col justify-between ">
            <p className=" ">Fast,safe, social payments</p>
            <p className="text-[1.7rem] text-left  font-light">Pay, get paid, grow a business, and more. Join the tens of millions of people on Venmo.</p>
           <button  id="vaultbtn" className="bg-[#008cff] text-base font-bold text-white rounded-3xl shadow-[10px_10px_0px_rgba(175,80,220,0.7)] hover:shadow-none w-[35%] py-3 transition-all duration-300 hover:bg-[#0f3554] hover:translate-x-[10px] hover:translate-y-[10px]">
            Get Vault
           </button>
            </div>
         
          <ImageMotion src={"/people.jpg"} isMainImage={true}></ImageMotion>
    
          </div>
          
          
         </div>

          <div className="p-20 mt-64  flex ">

            <div className="flex-shrink-0">
              <ImageMotion src={"/13429923.jpg"} isMainImage={false}></ImageMotion>
            </div>

            <div className=" flex flex-col justify-evenly ml-28 w-[40%] h-[500px] ml-25">
              <div className="text-5xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="text-xl font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="text-xl font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>



          </div>




          <div className="p-20 mt-32  flex ">

            

            <div className=" flex flex-col justify-evenly mr-28 w-[40%] h-[500px] mr-25">
              <div className="text-5xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="text-xl font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="text-xl font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>

            <div className="flex-shrink-0">
              <ImageMotion src={"/1307837.jpg"} isMainImage={false}></ImageMotion>
            </div>



          </div>

          

        



          <div className="p-20 mt-32 flex ">

            <div className="flex-shrink-0">
              <ImageMotion src={"/Hand.jpg"} isMainImage={false}></ImageMotion>
            </div>

            <div className=" flex flex-col justify-evenly ml-28 w-[40%] h-[500px] ml-25">
              <div className="text-5xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="text-xl font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="text-xl font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>



          </div>

          

        



          <div className="p-20 mt-32  flex ">

            

            <div className=" flex flex-col justify-evenly mr-28 w-[40%] h-[500px] mr-25">
              <div className="text-5xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="text-xl font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="text-xl font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>

            <div className="flex-shrink-0">
              <ImageMotion src={"/Portrait.jpg"} isMainImage={false}></ImageMotion>
            </div>



          </div>

          

        
          
       </div>
}
