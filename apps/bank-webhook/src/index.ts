import db from "@repo/db/client";
import express from "express"
import { paymentInformationSchema,paymentInformationType } from "@repo/zod-validation";
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config()


const app = express();
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));


app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation: paymentInformationType = {
        paymentId:req.body.paymentId,
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    const validation =  paymentInformationSchema.safeParse(paymentInformation)
    if (!validation.success) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: validation.error.flatten().fieldErrors
        });
    }
  

    try { const isProcessing = await db.onRampTransaction.findUnique({
        where: { id: Number(paymentInformation.paymentId) },
    });

    if (!isProcessing) {
        return res.status(404).json({
            message: "Payment not found",
        });
    }

    if (isProcessing.status !== "Processing") {
        return res.status(409).json({
            message: "Payment is already succeeded or failed",
        });
    }
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
    // Update balance in db, add txn
})

app.listen(3002,()=>{
    console.log("Server is listening")
});