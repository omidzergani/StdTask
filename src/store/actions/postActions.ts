import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  addPostRequest,
  deletePostRequest,
  getPostsRequest,
  Post,
  PostBody,
  updatePostRequest,
} from '../../api/posts';
import {addPost, setPostError, setPosts} from '../slices/postSlice';
import {
  checkIsLoading,
  getUpdatingItemsId,
  startAction,
  stopAction,
} from '../slices/uiSlice';
import {RootStore} from '..';
import {setProfilePosts} from '../slices/profileSlice';

export const getPostAsyncAction = createAsyncThunk<any, string | void>(
  'post',
  async (userId, {dispatch}) => {
    const ACTION_TYPE = getPostAsyncAction.pending.type;
    try {
      dispatch(startAction({name: ACTION_TYPE}));
      const posts = (await getPostsRequest({
        order: 'desc',
        //@ts-ignore
        userId,
      })) as Post[];

      if (userId) {
        dispatch(
          setProfilePosts({
            posts: posts,
            userId,
          }),
        );
      } else {
        dispatch(setPosts({posts}));
      }
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
  {postId: Post['id']; profileUserId?: string}
>('post', async ({postId, profileUserId}, {dispatch}) => {
  const ACTION = {
    name: deletePostAsyncAction.pending.type,
    params: {id: postId},
  };

  try {
    dispatch(startAction(ACTION));
    await deletePostRequest({
      postId,
    });

    dispatch(getPostAsyncAction(profileUserId));
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
  async (post, {dispatch, fulfillWithValue}) => {
    const ACTION = {
      name: addPostAsyncAction.pending.type,
    };
    try {
      dispatch(startAction(ACTION));
      const {data} = await addPostRequest(post);
      dispatch(getPostAsyncAction());
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
