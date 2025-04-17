/*
  Warnings:

  - You are about to drop the column `userId` on the `qr` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `qr` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qr" DROP CONSTRAINT "qr_userId_fkey";

-- AlterTable
ALTER TABLE "qr" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "qr" ADD CONSTRAINT "qr_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
