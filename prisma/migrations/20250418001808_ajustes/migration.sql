/*
  Warnings:

  - The primary key for the `user_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `user_categories` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `user_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_categories" DROP CONSTRAINT "user_categories_pkey",
DROP COLUMN "categoryName",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "user_categories_pkey" PRIMARY KEY ("user_email", "categoryId");

-- DropTable
DROP TABLE "Category";
