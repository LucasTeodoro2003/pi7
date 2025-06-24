/*
  Warnings:

  - You are about to drop the column `deleteProdutc` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "deleteProdutc",
ADD COLUMN     "authorizeProduct" TIMESTAMP(3),
ADD COLUMN     "deleteProduct" TIMESTAMP(3);
