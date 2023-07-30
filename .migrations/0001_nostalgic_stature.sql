CREATE TABLE `skec_products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`price` float NOT NULL,
	`quantity` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `skec_products_id` PRIMARY KEY(`id`)
);
