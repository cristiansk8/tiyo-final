/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `qr` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "qr" ADD COLUMN     "hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "qr_hash_key" ON "qr"("hash");
