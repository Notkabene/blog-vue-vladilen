export interface Comment {
  id: string;
  title: string;
  content: string;

}
export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  comments: Comment[];
  publishedAt: string;
}
