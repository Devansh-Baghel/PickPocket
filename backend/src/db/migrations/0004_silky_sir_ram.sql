CREATE TABLE `highlights` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`prefix` text NOT NULL,
	`suffix` text NOT NULL,
	`made_by` text NOT NULL,
	`article_id` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `highlights_made_by_idx` ON `highlights` (`made_by`);--> statement-breakpoint
CREATE INDEX `highlights_article_id_idx` ON `highlights` (`article_id`);--> statement-breakpoint
CREATE INDEX `highlights_made_by_article_id_idx` ON `highlights` (`made_by`,`article_id`);