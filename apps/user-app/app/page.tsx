
import "./page.module.css"
import {ImageMotion} from "@repo/ui/image-motion"

export default function LandingPage() {
 
       return<div className="bg-[#faf3f4]">
         

         <div className=" w-full srcoll-smooth overflow-y-hidden relative">
          <div className="bg-[#DEEFFF] m-auto font-normal p-5 text-3xl w-[90%] h-[20rem] md:w-[70%] md:text-8xl md:h-[700px] md:p-24 md:ml-24 md:mr-[316px] mt-24 rounded-[2rem]">
            <div className="md:w-[50%] h-[100%] flex flex-col justify-around items-center md:justify-between ">
            <p className="  ">Fast,safe, social payments</p>
            <p className="md:text-[1.7rem] text-xl md:text-left text-center  font-light">Pay, get paid, grow a business, and more. Join the tens of millions of people on Venmo.</p>
           <button  id="vaultbtn" className="bg-[#008cff] w-[35%] text-base font-bold text-white rounded-3xl shadow-[10px_10px_0px_rgba(175,80,220,0.7)] hover:shadow-none md:w-[35%] py-3 transition-all duration-300 hover:bg-[#0f3554] hover:translate-x-[10px] hover:translate-y-[10px]">
            Get Vault
           </button>
            </div>
            <div className="md:block hidden">
            <ImageMotion src={"/people.jpg"} isMainImage={true}></ImageMotion>
            </div>
         
          
    
          </div>
          
          
         </div>

          <div className="md:p-20 p-7 md:mt-64 mt-32 items-center flex md:flex-row flex-col space-y-5 ">

            <div className="flex-shrink-0 w-fit " >
              <ImageMotion src={"/13429923.jpg"} isMainImage={false}></ImageMotion>
            </div>

            <div className=" flex flex-col items-center justify-evenly md:ml-28 md:w-[40%] md:h-[500px] md:ml-25">
              <div className="md:text-5xl text-xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="md:text-xl hidden md:block text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
            <p className="md:text-xl hidden md:block text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>
           
            <p className="md:text-xl md:hidden text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
            <p className="md:text-xl md:hidden text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>



          </div>




          <div className="md:p-20 p-7  md:mt-32 mt-16 items-center   flex md:flex-row flex-col space-y-5 ">

          <div className=" md:hidden   flex-shrink-0">
              <ImageMotion src={"/1307837.jpg"} isMainImage={false}></ImageMotion>
            </div>

            <div className=" flex flex-col justify-evenly md:mr-28 md:w-[40%] md:h-[500px] md:mr-25">
              <div className="md:text-5xl text-xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="md:text-xl hidden md:block text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="md:text-xl hidden md:block text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>
            <p className="md:text-xl md:hidden text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="md:text-xl md:hidden text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>

            <div className=" hidden md:block flex-shrink-0">
              <ImageMotion src={"/1307837.jpg"} isMainImage={false}></ImageMotion>
            </div>



          </div>

          

        



          <div className="md:p-20 p-7  md:mt-32 mt-16 items-center flex md:flex-row flex-col space-y-5">

            <div className="flex-shrink-0 w-fit">
              <ImageMotion src={"/Hand.jpg"} isMainImage={false}></ImageMotion>
            </div>

            <div className=" items-center flex flex-col justify-evenly md:ml-28 md:w-[40%] md:h-[500px] md:ml-25">
              <div className="md:text-5xl text-xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="md:text-xl hidden md:block text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="md:text-xl hidden md:block text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>

            <p className="md:text-xl md:hidden text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
            <p className="md:text-xl md:hidden text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>

          </div>

          

        



          <div className="md:p-20 p-7 md:mt-32 mt-16 items-center flex md:flex-row  flex-col space-y-5 ">

          <div className=" md:hidden w-fit md:w-full  flex-shrink-0 ">
              <ImageMotion src={"/Portrait.jpg"} isMainImage={false}></ImageMotion>
            </div>

            <div className=" flex flex-col items-center justify-evenly md:mr-28 md:w-[40%] md:h-[500px] md:mr-25">
              <div className="md:text-5xl text-xl flex-shrink">
              Shop your favorite brands
              </div>
              <p className="md:text-xl hidden md:block text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
              <p className="md:text-xl hidden md:block text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>
            </div>
            <p className="md:text-xl md:hidden text-sm font-light">Just like sending money to friends, you can use Venmo to checkout at some of your favorite brands in-stores and online. Now getting repaid for last night’s dinner can cover this morning’s latte.</p>
            <p className="md:text-xl md:hidden text-sm font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium quia at eos voluptates itaque velit. Dignissimos obcaecati placeat error. Exercitationem totam facilis explicabo voluptatum. Vel fugiat voluptatem asperiores unde?</p>

            <div className="flex-shrink-0 hidden md:block">
              <ImageMotion src={"/Portrait.jpg"} isMainImage={false}></ImageMotion>
            </div>



          </div>

          

        
          
       </div>
}
