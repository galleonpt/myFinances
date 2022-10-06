/*
  Warnings:

  - You are about to drop the column `currency` on the `expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `expenses` DROP COLUMN `currency`,
    ADD COLUMN `currencyId` INTEGER NOT NULL DEFAULT 49;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
