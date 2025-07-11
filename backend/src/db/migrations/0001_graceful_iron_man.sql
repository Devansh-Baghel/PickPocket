PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_saves` (
	`id` text PRIMARY KEY NOT NULL,
	`made_by` text NOT NULL,
	`is_archived` integer DEFAULT false,
	`is_favorite` integer DEFAULT false,
	`article_id` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_saves`("id", "made_by", "is_archived", "is_favorite", "article_id", "timestamp") SELECT "id", "made_by", "is_archived", "is_favorite", "article_id", "timestamp" FROM `saves`;--> statement-breakpoint
DROP TABLE `saves`;--> statement-breakpoint
ALTER TABLE `__new_saves` RENAME TO `saves`;--> statement-breakpoint
PRAGMA foreign_keys=ON;