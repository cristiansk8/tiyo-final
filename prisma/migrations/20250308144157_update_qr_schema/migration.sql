/*
  Warnings:

  - You are about to drop the column `ciudad` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `qr` table. All the data in the column will be lost.
  - The `cont` column on the `qr` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ciudad",
DROP COLUMN "departamento";

-- AlterTable
ALTER TABLE "qr" DROP COLUMN "priority",
DROP COLUMN "cont",
ADD COLUMN     "cont" INTEGER;
