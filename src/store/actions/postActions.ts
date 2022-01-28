import {createAsyncThunk} from '@reduxjs/toolkit';
import {deletePostRequest, getPostsRequest, Post} from '../../api/posts';
import {setPostError, setPosts, setUserPosts} from '../slices/postSlice';
import {startAction, stopAction} from '../slices/uiSlice';
import {RootStore} from '..';

export const getPostAsyncAction = createAsyncThunk<
  any,
  {getUserPosts?: boolean}
>('login', async ({getUserPosts}, ThunkApi) => {
  const ACTION_TYPE = getPostAsyncAction.pending.type;
  try {
    const state = ThunkApi.getState() as RootStore;
    ThunkApi.dispatch(startAction({name: ACTION_TYPE}));
    const posts = await getPostsRequest({
      userId: getUserPosts ? state.user.user.id : undefined,
    });
    ThunkApi.dispatch(getUserPosts ? setUserPosts({posts}) : setPosts({posts}));
  } catch (e) {
    ThunkApi.dispatch(
      setPostError({
        error: true,
        message: e.message,
      }),
    );
  } finally {
    ThunkApi.dispatch(stopAction({name: ACTION_TYPE}));
  }
});

export const deletePostAsyncAction = createAsyncThunk<
  any,
  {postId: Post['id']; getUserPosts?: boolean}
>('login', async ({postId, getUserPosts}, ThunkApi) => {
  const ACTION = {
    name: deletePostAsyncAction.pending.type,
    params: {id: postId},
  };

  try {
    ThunkApi.dispatch(startAction(ACTION));
    await deletePostRequest({
      postId,
    });

    ThunkApi.dispatch(getPostAsyncAction({getUserPosts}));
  } catch (e) {
    ThunkApi.dispatch(
      setPostError({
        error: true,
        message: e.message,
      }),
    );
  } finally {
    ThunkApi.dispatch(stopAction(ACTION));
  }
});
