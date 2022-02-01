import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootStore} from '..';
import {Post} from '../../api/posts';
import {User} from '../../api/user';

interface initialState {
  user?: {[key: User['id']]: User};
  posts: {[key: User['id']]: {[key: Post['id']]: Post}};
}

const initialState: initialState = {
  user: {},
  posts: {},
};

const profileSlice = createSlice({
  initialState,
  reducers: {
    setProfileUser(state, action: PayloadAction<User>) {
      state.user[action.payload.id] = action.payload;
    },
    setProfilePosts(
      state,
      action: PayloadAction<{posts: Post[]; userId: User['id']}>,
    ) {
      state.posts[action.payload.userId] = action.payload.posts;
    },

    deleteUserProfile(state, action: PayloadAction<User['id']>) {
      delete state.user[action.payload];
      delete state.posts[action.payload];
    },
  },
  name: 'profile',
});

//selectors
export const selectUserProfile = (userId: User['id']) => (state: RootStore) =>
  state.profile.user[userId];
// export const selectUserPosts = (state: RootStore) => state.profile.posts;

export const selectProfilePost =
  (userId: User['id'], postId: Post['id']) => (state: RootStore) => {
    return state.profile.posts[userId][postId];
  };

export const selectProfilePostsArray =
  (userId: User['id']) =>
  (state: RootStore): Post[] => {
    return Object.values(state.profile.posts[userId] ?? {});
  };

export const {setProfilePosts, setProfileUser, deleteUserProfile} =
  profileSlice.actions;
export default profileSlice.reducer;
