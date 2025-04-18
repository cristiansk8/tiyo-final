/*
  Warnings:

  - The primary key for the `user_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `user_categories` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `user_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_categories" DROP CONSTRAINT "user_categories_categoryId_fkey";

-- AlterTable
ALTER TABLE "user_categories" DROP CONSTRAINT "user_categories_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD CONSTRAINT "user_categories_pkey" PRIMARY KEY ("user_email");
