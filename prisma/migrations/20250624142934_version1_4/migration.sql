/*
  Warnings:

  - Added the required column `authorizationUp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authorizationDate" TIMESTAMP(3),
ADD COLUMN     "authorizationUp" BOOLEAN NOT NULL,
ADD COLUMN     "description" TEXT;
