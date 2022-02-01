import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist/es/constants';
import {Post} from '../../api/posts';
import {RootStore} from '../index';

interface PostState {
  posts: {[postId: Post['id']]: Post};
  error: boolean;
  message?: string;
}

const initialState: PostState = {
  posts: [],
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

    addPost(state, action: PayloadAction<Post>) {
      return {
        ...state,
        posts: {
          [action.payload.id]: action.payload,
          ...state.posts,
        },
      };
    },
    deletePost(state, action: PayloadAction<{postId: Post['id']}>) {
      delete state.posts[action.payload.postId];
    },
    setUserPosts(state, action: PayloadAction<{posts: Post[]}>) {
      const posts = {};
      action.payload.posts.forEach(post => {
        posts[post.id] = post;
      });

      return {
        ...state,
        profilePosts: posts,
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
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const selectPost = (state: RootStore, postId: Post['id']) => {
  return state.posts.posts[postId];
};

export const selectPostsArray = (state: RootStore): Post[] => {
  return Object.values(state.posts.posts);
};

export const {setPosts, setUserPosts, setPostError, addPost} =
  postSlice.actions;
export default postSlice.reducer;
