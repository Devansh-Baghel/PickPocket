DROP INDEX `articles_url_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `articles_url_unique_idx` ON `articles` (`url`);--> statement-breakpoint
CREATE INDEX `saves_made_by_idx` ON `saves` (`made_by`);--> statement-breakpoint
CREATE INDEX `saves_article_id_idx` ON `saves` (`article_id`);--> statement-breakpoint
CREATE INDEX `saves_made_by_article_id_idx` ON `saves` (`made_by`,`article_id`);