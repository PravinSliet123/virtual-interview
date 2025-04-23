-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isEnable` BOOLEAN NOT NULL DEFAULT true,
    `credits` INTEGER NOT NULL DEFAULT 3,
    `profile` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interviews` (
    `interviewId` VARCHAR(191) NOT NULL,
    `questions` JSON NOT NULL,
    `response` JSON NULL,
    `userId` TEXT NOT NULL,
    `duration` TEXT NOT NULL,
    `jobPosition` TEXT NOT NULL,
    `jobDescription` TEXT NOT NULL,
    `interviewTypes` JSON NOT NULL,

    PRIMARY KEY (`interviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Interviews` ADD CONSTRAINT `Interviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
