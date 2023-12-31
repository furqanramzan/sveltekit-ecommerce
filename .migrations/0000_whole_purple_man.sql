CREATE TABLE `skec_admin_passwords` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`admin_id` bigint UNSIGNED,
	`password` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skec_admin_passwords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skec_admins` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skec_admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `skec_categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`image` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skec_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skec_orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`phone` varchar(256) NOT NULL,
	`city` varchar(256) NOT NULL,
	`address` varchar(256) NOT NULL,
	`total` float NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skec_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skec_products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`category_id` bigint UNSIGNED,
	`name` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`price` float NOT NULL,
	`quantity` int NOT NULL,
	`image` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skec_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skec_products_to_orders` (
	`product_id` bigint UNSIGNED NOT NULL,
	`order_id` bigint UNSIGNED NOT NULL,
	CONSTRAINT `skec_products_to_orders_order_id_product_id` PRIMARY KEY(`order_id`,`product_id`)
);
