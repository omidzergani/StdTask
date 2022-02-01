import {axios} from './config';
import {User} from './user';

export interface PostBody {
  title: string;
  description: string;
  userId: string;
  website?: string;
  category: string;
  time?: number;
}

export interface Post extends PostBody {
  id: number;
}

export async function getPostsRequest({
  userId,
  order,
}: {userId?: User['id']; order?: 'desc' | 'asc'} | undefined) {
  const {data} = await axios.get(`/posts?_sort=time&_order=desc`, {
    params: {
      userId,
    },
  });
  return data;
}

export async function deletePostRequest({postId}: {postId: Post['id']}) {
  return axios.delete(`/posts/${postId}`);
}

export async function addPostRequest(post: PostBody) {
  const {data} = await axios.post('/posts', {...post, time: Date.now()});
  return data;
}

export async function updatePostRequest(
  post: Partial<Post>,
  postId: Post['id'],
) {
  const {data} = await axios.put(`/posts/${postId}`, post);
  return data;
}

// "id": 1,
//       "title": "TITLE 0",
//       "description": "Description of the post 0",
//       "user_id": 1,
//       "website": "",
//       "category": ""
