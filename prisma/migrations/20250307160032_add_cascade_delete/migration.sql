-- DropForeignKey
ALTER TABLE "Scan" DROP CONSTRAINT "Scan_qrId_fkey";

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "qr"("id") ON DELETE CASCADE ON UPDATE CASCADE;
