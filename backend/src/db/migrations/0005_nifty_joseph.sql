CREATE TABLE `user_preferences` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`autoArchive` integer DEFAULT true,
	`emailNotifications` integer DEFAULT false,
	`readingReminders` integer DEFAULT true,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
