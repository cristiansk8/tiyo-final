/*
  Warnings:

  - The primary key for the `Scan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `qrId` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the `qr` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qrCodeId` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Scan" DROP CONSTRAINT "Scan_qrId_fkey";

-- DropForeignKey
ALTER TABLE "qr" DROP CONSTRAINT "qr_userEmail_fkey";

-- AlterTable
ALTER TABLE "Scan" DROP CONSTRAINT "Scan_pkey",
DROP COLUMN "qrId",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "qrCodeId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Scan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Scan_id_seq";

-- DropTable
DROP TABLE "qr";

-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT,
    "qrImage" TEXT,
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_categories" (
    "userId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_categories_pkey" PRIMARY KEY ("userId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_hash_key" ON "QRCode"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
