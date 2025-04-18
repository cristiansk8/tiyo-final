/*
  Warnings:

  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_userId_fkey";

-- DropForeignKey
ALTER TABLE "Scan" DROP CONSTRAINT "Scan_qrCodeId_fkey";

-- DropTable
DROP TABLE "QRCode";

-- DropTable
DROP TABLE "Scan";
