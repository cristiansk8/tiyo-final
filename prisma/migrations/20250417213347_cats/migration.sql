/*
  Warnings:

  - You are about to drop the column `active` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `user_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_categories" DROP CONSTRAINT "user_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "user_categories" DROP CONSTRAINT "user_categories_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "active";

-- DropTable
DROP TABLE "user_categories";

-- CreateTable
CREATE TABLE "UserCategory" (
    "userId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("userId","categoryId")
);

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
