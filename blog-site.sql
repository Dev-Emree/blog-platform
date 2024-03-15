CREATE TABLE `User Auth`(
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `User Auth` ADD INDEX `user auth_email_phone_number_username_index`(`email`, `phone_number`, `username`);
ALTER TABLE
    `User Auth` ADD UNIQUE `user auth_email_unique`(`email`);
ALTER TABLE
    `User Auth` ADD UNIQUE `user auth_phone_number_unique`(`phone_number`);
ALTER TABLE
    `User Auth` ADD UNIQUE `user auth_username_unique`(`username`);
CREATE TABLE `Categories`(
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `Categories` ADD INDEX `categories_id_index`(`id`);
CREATE TABLE `Articles`(
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `title` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `category_id` CHAR(36) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `Articles` ADD INDEX `articles_id_user_id_category_id_index`(`id`, `user_id`, `category_id`);
CREATE TABLE `Users`(
    `id` CHAR(36) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `profile_photo` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `bio` BIGINT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `Users` ADD INDEX `users_id_username_name_index`(`id`, `username`, `name`);
ALTER TABLE
    `Users` ADD UNIQUE `users_username_unique`(`username`);
CREATE TABLE `Comments`(
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `article_id` CHAR(36) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `Comments` ADD INDEX `comments_id_user_id_article_id_index`(`id`, `user_id`, `article_id`);
CREATE TABLE `Tags`(
    `id` CHAR(36) NOT NULL,
    `name` TEXT NOT NULL,
    `article_id` CHAR(36) NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `Tags` ADD INDEX `tags_id_article_id_index`(`id`, `article_id`);
ALTER TABLE
    `Comments` ADD CONSTRAINT `comments_article_id_foreign` FOREIGN KEY(`article_id`) REFERENCES `Articles`(`id`);
ALTER TABLE
    `Articles` ADD CONSTRAINT `articles_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Comments` ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `User Auth` ADD CONSTRAINT `user auth_id_foreign` FOREIGN KEY(`id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Articles` ADD CONSTRAINT `articles_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `Categories`(`id`);
ALTER TABLE
    `Tags` ADD CONSTRAINT `tags_article_id_foreign` FOREIGN KEY(`article_id`) REFERENCES `Articles`(`id`);