/*
  Warnings:

  - You are about to drop the column `emailUser` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_emailUser_fkey";

-- DropIndex
DROP INDEX "UserProfile_emailUser_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "emailUser",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
