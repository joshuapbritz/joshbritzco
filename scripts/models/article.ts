import { User } from './user';

export interface Article {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image?: string;
  readable_publish_date: string;
  social_image: string;
  tag_list: string[];
  tags: string;
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  collection_id?: any;
  created_at: string;
  edited_at?: string;
  crossposted_at?: any;
  published_at: string;
  last_comment_at: string;
  published_timestamp: string;
  user: User;
}
