/*
  Warnings:

  - Made the column `name` on table `expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `name` VARCHAR(191) NOT NULL;
