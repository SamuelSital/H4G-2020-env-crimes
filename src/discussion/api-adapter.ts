import { API_URL } from "../config";
import { IUser, IPost, PostData, unifyComment, findCreator, IComment } from "./mock-data";

import FallbackPosts from '../data-fallback/dummy_data1.json';
import FallbackUsers from '../data-fallback/users.json';

export async function fetchDiscussionData(id: string): Promise<PostData> {
  let userData: { data: IUser[] };
  let postData: { data: IPost[] };
  try {
    userData = await (await fetch(`${API_URL}/users`)).json();
    postData = await (await fetch(`${API_URL}/posts`)).json();
  } catch (e) {
    postData = FallbackPosts as any;
    userData = FallbackUsers as any;
  }
  const post = postData.data.find(p => p.id === id);
  if (!post) throw new Error('Post not found!');

  return {
    ...post,
    creator: findCreator(post.creatorId, userData.data),
    comments: post.comments.map(c => unifyComment(c, userData.data)),
  }
}


export async function fetchPostOverview(): Promise<PostData[]> {
  let userData: { data: IUser[] };
  let postData: { data: IPost[] };
  try {
    userData = await (await fetch(`${API_URL}/users`)).json();
    postData = await (await fetch(`${API_URL}/posts`)).json();
  } catch (e) {
    postData = FallbackPosts as any;
    userData = FallbackUsers as any;
  }
  return postData.data.map(post => ({
    ...post,
    creator: findCreator(post.creatorId, userData.data),
    comments: post.comments.map(c => unifyComment(c, userData.data)),
  }));
}

export function countComments(comments: IComment[]): number {
  return comments.length + comments.reduce((sum, comment) => sum + countComments(comment.comments || []), 0);
}