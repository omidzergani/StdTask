import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../api/posts';
import {RootStore} from '../index';

interface PostState {
  posts: {[postId: Post['id']]: Post};
  postsByUser: {[postId: Post['id']]: Post};
  error: boolean;
  message?: string;
}

const initialState: PostState = {
  posts: [],
  postsByUser: [],
  error: false,
  message: undefined,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<{posts: Post[]}>) {
      const posts = {};
      action.payload.posts.forEach(post => {
        posts[post.id] = post;
      });

      return {
        ...state,
        posts,
      };
    },
    deletePost(state, action: PayloadAction<{postId: Post['id']}>) {
      delete state.posts[action.payload.postId];
      delete state.postsByUser[action.payload.postId];
    },
    setUserPosts(state, action: PayloadAction<{posts: Post[]}>) {
      const posts = {};
      action.payload.posts.forEach(post => {
        posts[post.id] = post;
      });

      return {
        ...state,
        postsByUser: posts,
      };
    },
    setPostError(
      state,
      action: PayloadAction<{error: boolean; message?: string}>,
    ) {
      state.error = action.payload.error;
      state.message = action.payload.message;
    },
  },
});

export const selectPost = (state: RootStore, postId: Post['id']) => {
  return state.posts.posts[postId];
};

export const selectUserPost = (state: RootStore, postId: Post['id']) => {
  return state.posts.postsByUser[postId];
};

export const selectPostsArray = (state: RootStore): Post[] => {
  return Object.values(state.posts.posts);
};
export const selectUserPostsArray = (state: RootStore): Post[] => {
  return Object.values(state.posts.postsByUser);
};

export const {setPosts, setUserPosts, setPostError} = postSlice.actions;
export default postSlice.reducer;
