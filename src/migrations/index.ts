import * as migration_20260409_155734_initial from './20260409_155734_initial'
import * as migration_20261012_125400_blog_posts_and_site_info from './20261012_125400_blog_posts_and_site_info'
import * as migration_20261012_134800_users_reset_password_requested_at from './20261012_134800_users_reset_password_requested_at'

export const migrations = [
  {
    up: migration_20260409_155734_initial.up,
    down: migration_20260409_155734_initial.down,
    name: '20260409_155734_initial',
  },
  {
    up: migration_20261012_125400_blog_posts_and_site_info.up,
    down: migration_20261012_125400_blog_posts_and_site_info.down,
    name: '20261012_125400_blog_posts_and_site_info',
  },
  {
    up: migration_20261012_134800_users_reset_password_requested_at.up,
    down: migration_20261012_134800_users_reset_password_requested_at.down,
    name: '20261012_134800_users_reset_password_requested_at',
  },
]
