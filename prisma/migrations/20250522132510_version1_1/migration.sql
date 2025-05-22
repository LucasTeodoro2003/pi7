/*
  Warnings:

  - Added the required column `typeProduct` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "id_token" TEXT;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "typeProduct" TEXT NOT NULL,
ALTER COLUMN "image" SET NOT NULL;
