export interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
}
export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  comments: Comment[];
  publishedAt: string;
}
