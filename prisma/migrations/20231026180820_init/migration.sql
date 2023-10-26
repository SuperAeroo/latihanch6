/*
  Warnings:

  - You are about to drop the column `email` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailUser]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailUser` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_email_fkey";

-- DropIndex
DROP INDEX "UserProfile_email_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "email",
ADD COLUMN     "emailUser" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_emailUser_key" ON "UserProfile"("emailUser");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
