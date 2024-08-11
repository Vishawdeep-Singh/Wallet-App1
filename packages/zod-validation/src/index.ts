import {z} from "zod"


export const SignUpSchema = z.object({
    name:z.string().min(3,{ message: "Name must be 3 or more characters long" }),
    email: z.string().email(),
    number: z.string().length(10,{message:"Phone Number must be of 10 digits"}),
    password: z.string().min(6,{ message: "Password must be 6 or more characters long" }),
    

  });
export const SignInSchema = z.object({
    
    number: z.string().length(10,{message:"Phone Number must be of 10 digits"}),
    password: z.string().min(6,{ message: "Password must be 6 or more characters long" }),
    

  });

 export const paymentInformationSchema = z.object({
  paymentId:z.string().min(1,"Payment Id is required"),
    token: z.string().min(1, "Token is required"),
    userId: z.string().min(1, "User ID is required"),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
});

export type paymentInformationType = z.infer<typeof paymentInformationSchema>

  export type SignUpType = z.infer<typeof SignUpSchema>
  export type SignInType = z.infer<typeof SignInSchema>