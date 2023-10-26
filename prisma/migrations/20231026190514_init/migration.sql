/*
  Warnings:

  - You are about to drop the column `email` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUser]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_email_fkey";

-- DropIndex
DROP INDEX "UserProfile_email_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "email",
ADD COLUMN     "idUser" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_idUser_key" ON "UserProfile"("idUser");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
