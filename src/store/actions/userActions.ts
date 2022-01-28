import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  sendLoginRequest,
  signUpRequest,
  UserCredential,
  UserSignUpData,
} from '../../api/user';
import {startAction, stopAction} from '../slices/uiSlice';
import {setUser, setUserError} from '../slices/userSlice';

export const loginAsyncAction = createAsyncThunk<any, UserCredential>(
  'login',
  async ({email, password}, ThunkApi) => {
    const ACTION_TYPE = loginAsyncAction.pending.type;
    try {
      ThunkApi.dispatch(startAction({name: ACTION_TYPE}));
      const data = await sendLoginRequest({email, password});
      if (!data?.id) {
        throw data;
      }
      ThunkApi.dispatch(
        setUser({
          user: data,
          isSignedIn: true,
        }),
      );
    } catch (e) {
      ThunkApi.dispatch(
        setUserError({
          error: true,
          message: e.message,
        }),
      );
    } finally {
      ThunkApi.dispatch(stopAction({name: ACTION_TYPE}));
    }
  },
);

export const signUpAsyncAction = createAsyncThunk<any, UserSignUpData>(
  'login',
  async (body, ThunkApi) => {
    const ACTION_TYPE = signUpAsyncAction.pending.type;
    try {
      ThunkApi.dispatch(startAction({name: ACTION_TYPE}));
      const data = await signUpRequest(body);
      ThunkApi.dispatch(
        setUser({
          user: data,
          isSignedIn: true,
        }),
      );
    } catch (e) {
      ThunkApi.dispatch(
        setUserError({
          error: true,
          message: e.message,
        }),
      );
    } finally {
      ThunkApi.dispatch(stopAction({name: ACTION_TYPE}));
    }
  },
);
