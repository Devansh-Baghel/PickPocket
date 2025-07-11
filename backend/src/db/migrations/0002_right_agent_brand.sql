ALTER TABLE `articles` ADD `excerpt` text NOT NULL;--> statement-breakpoint
ALTER TABLE `articles` ADD `lang` text DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE `articles` ADD `published_time` text;--> statement-breakpoint
ALTER TABLE `articles` ADD `site_name` text NOT NULL;