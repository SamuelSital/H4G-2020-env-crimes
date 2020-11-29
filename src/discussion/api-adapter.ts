import { API_URL } from "../config";
import { IUser, IPost, PostData, unifyComment, findCreator, IComment } from "./mock-data";

export async function fetchDiscussionData(id: string): Promise<PostData> {
  const userData: { data: IUser[] } = await (await fetch(`${API_URL}/users`)).json();
  const postData: { data: IPost[] } = await (await fetch(`${API_URL}/posts`)).json();
  const post = postData.data.find(p => p.id === id);
  if (!post) throw new Error('Post not found!');

  return {
    ...post,
    creator: findCreator(post.creatorId, userData.data),
    comments: post.comments.map(c => unifyComment(c, userData.data)),
  }
}


export async function fetchPostOverview(): Promise<PostData[]> {
  const userData: { data: IUser[] } = await (await fetch(`${API_URL}/users`)).json();
  const postData: { data: IPost[] } = await (await fetch(`${API_URL}/posts`)).json();

  return postData.data.map(post => ({
    ...post,
    creator: findCreator(post.creatorId, userData.data),
    comments: post.comments.map(c => unifyComment(c, userData.data)),
  }));
}

export function countComments(comments: IComment[]): number {
  return comments.length + comments.reduce((sum, comment) => sum + countComments(comment.comments || []), 0);
}