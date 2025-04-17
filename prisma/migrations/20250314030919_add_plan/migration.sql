-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Basic', 'Pro', 'Enterprise');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'Basic';
