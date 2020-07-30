CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2020_07_27_071118_create_tnc_users_table', 1);


CREATE TABLE IF NOT EXISTS `tnc_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_level` enum('super','admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_last_activity` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tnc_users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `tnc_users` (`id`, `first_name`, `last_name`, `email`, `password`, `access_level`, `remember_token`, `user_last_activity`, `created_at`, `updated_at`) VALUES
	(1, 'Super', 'Admin', 'super@admin.com', '$2y$10$pU0v5lc8XuQJL.ifItACC.G9hTtdDCxRWW13S9IC4R.mdxQX3aXrS', 'super', 'TFrd0U1Tujv2CBE9Tt1vRmiZFCuLrHyVVF7iYUn5v3N3bptW1lvQockXRXVQ', '2020-07-30 09:40:33', NULL, '2020-07-30 09:40:33'),
	(2, 'Simple', 'UserUpdate', 'simple@user.com', '$2y$10$Ew1ItWI.4zB0mTbEMzBsZO2FyNaHwNVPfW4sQXxKCR8z4HV33STUG', 'user', '', '2020-07-30 09:36:51', '2020-07-30 09:17:59', '2020-07-30 09:36:51'),
	(3, 'SimpleUpdate', 'Admin', 'simple@admin.com', '$2y$10$TcH9aDep9JYW4S/ZANwsyuvvnUi3A9Xak/vRijGqmM0LY.SDtAZhy', 'admin', '', '2020-07-30 09:23:26', '2020-07-30 09:18:17', '2020-07-30 09:23:26'),
	(4, 'SimpleChanged', 'UserTwo', 'simple@user.two', '$2y$10$UsOIAJQDoy17nT6cRXovgulekL69o.KFZ7qVcbaGoU5D128gV8ewC', 'user', '', '2020-07-30 09:40:22', '2020-07-30 09:38:49', '2020-07-30 09:40:22');
