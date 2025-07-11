CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`title` text(255) NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`lang` text DEFAULT 'en',
	`published_time` text,
	`site_name` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_url_unique` ON `articles` (`url`);--> statement-breakpoint
CREATE TABLE `saves` (
	`id` text PRIMARY KEY NOT NULL,
	`made_by` text NOT NULL,
	`is_archived` integer DEFAULT false,
	`is_favorite` integer DEFAULT false,
	`article_id` text NOT NULL,
	`title` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`title`) REFERENCES `articles`(`title`) ON UPDATE no action ON DELETE cascade
);
