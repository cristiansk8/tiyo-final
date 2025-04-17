-- DropForeignKey
ALTER TABLE "qr" DROP CONSTRAINT "qr_userId_fkey";

-- AlterTable
ALTER TABLE "qr" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "qr" ADD CONSTRAINT "qr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
