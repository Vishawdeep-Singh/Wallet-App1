/*
  Warnings:

  - Added the required column `status` to the `user2merchantTx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `user2merchantTx` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user2merchantTx" ADD COLUMN     "status" "OnRampStatus" NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
