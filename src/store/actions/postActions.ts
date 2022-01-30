import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  addPostRequest,
  deletePostRequest,
  getPostsRequest,
  Post,
  PostBody,
  updatePostRequest,
} from '../../api/posts';
import {
  addPost,
  setPostError,
  setPosts,
  setUserPosts,
} from '../slices/postSlice';
import {
  checkIsLoading,
  getUpdatingItemsId,
  startAction,
  stopAction,
} from '../slices/uiSlice';
import {RootStore} from '..';

type GetUserPosts = boolean;

export const getPostAsyncAction = createAsyncThunk<any, GetUserPosts>(
  'post',
  async (getUserPosts, {dispatch, getState}) => {
    const ACTION_TYPE = getPostAsyncAction.pending.type;
    try {
      const state = getState() as RootStore;
      dispatch(startAction({name: ACTION_TYPE}));
      const posts = await getPostsRequest({
        userId: getUserPosts ? state.user.user.id : undefined,
        order: 'desc',
      });
      dispatch(getUserPosts ? setUserPosts({posts}) : setPosts({posts}));
    } catch (e) {
      dispatch(
        setPostError({
          error: true,
          message: e.message,
        }),
      );
    } finally {
      dispatch(stopAction({name: ACTION_TYPE}));
    }
  },
);
export const checkIfGetPostIsLoading = (state: RootStore) =>
  checkIsLoading(state, getPostAsyncAction.pending.type);

export const deletePostAsyncAction = createAsyncThunk<
  any,
  {postId: Post['id']; getUserPosts?: boolean}
>('post', async ({postId, getUserPosts}, {dispatch}) => {
  const ACTION = {
    name: deletePostAsyncAction.pending.type,
    params: {id: postId},
  };

  try {
    dispatch(startAction(ACTION));
    await deletePostRequest({
      postId,
    });

    dispatch(getPostAsyncAction(getUserPosts));
  } catch (e) {
    dispatch(
      setPostError({
        error: true,
        message: e.message,
      }),
    );
  } finally {
    dispatch(stopAction(ACTION));
  }
});
export const selectDeletingPostsIds = (state: RootStore) =>
  getUpdatingItemsId(state, deletePostAsyncAction.pending.type);

export const addPostAsyncAction = createAsyncThunk<any, PostBody>(
  'post',
  async (post, {dispatch, fulfillWithValue, rejectWithValue}) => {
    const ACTION = {
      name: addPostAsyncAction.pending.type,
    };
    try {
      dispatch(startAction(ACTION));
      const {data} = await addPostRequest(post);
      dispatch(getPostAsyncAction(false));
      fulfillWithValue(data);
    } catch (e) {
      dispatch(
        setPostError({
          error: true,
          message: e.message,
        }),
      );
      throw e;
    } finally {
      dispatch(stopAction(ACTION));
    }
  },
);

export const checkIfAddPostIsLoading = (state: RootStore) =>
  checkIsLoading(state, addPostAsyncAction.pending.type);

export const updatePostAsyncAction = createAsyncThunk<
  any,
  {post: PostBody; postId: number}
>('post', async ({post, postId}, {dispatch, fulfillWithValue}) => {
  const ACTION = {
    name: updatePostAsyncAction.pending.type,
  };
  try {
    dispatch(startAction(ACTION));
    const {data} = await updatePostRequest(post, postId);
    dispatch(addPost(data));
    fulfillWithValue(data);
  } catch (e) {
    dispatch(
      setPostError({
        error: true,
        message: e.message,
      }),
    );
    throw e;
  } finally {
    dispatch(stopAction(ACTION));
  }
});

export const checkIfUpdatePostIsLoading = (state: RootStore) =>
  checkIsLoading(state, updatePostAsyncAction.pending.type);
