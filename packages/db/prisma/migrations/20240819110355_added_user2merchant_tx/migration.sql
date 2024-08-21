-- CreateTable
CREATE TABLE "user2merchantTx" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toMerchantId" TEXT NOT NULL,

    CONSTRAINT "user2merchantTx_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user2merchantTx" ADD CONSTRAINT "user2merchantTx_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user2merchantTx" ADD CONSTRAINT "user2merchantTx_toMerchantId_fkey" FOREIGN KEY ("toMerchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
