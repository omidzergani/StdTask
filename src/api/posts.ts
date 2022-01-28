import {axios} from './config';
import {User} from './user';

export interface Post {
  id: number;
  title: string;
  description: string;
  userId: number;
  website?: string;
  category: string;
}

export async function getPostsRequest({
  userId,
}: {userId?: User['id']} | undefined) {
  const {data} = await axios.get('/posts', {
    params: {
      userId,
    },
  });
  return data;
}

export async function deletePostRequest({postId}: {postId: Post['id']}) {
  return axios.delete(`/posts/${postId}`);
}

export async function addPostRequest(post: Post) {
  const {data} = await axios.post('/posts', {
    data: post,
  });
  return data;
}

export async function updatePostRequest(
  post: Partial<Post> & {postId: Post['id']},
) {
  const {data} = await axios.put('/posts', {
    params: {
      id: post.postId,
    },
    data: post,
  });
  return data;
}

// "id": 1,
//       "title": "TITLE 0",
//       "description": "Description of the post 0",
//       "user_id": 1,
//       "website": "",
//       "category": ""
