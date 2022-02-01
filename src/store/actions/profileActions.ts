import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootStore} from '..';
import {getUserProfile} from '../../api/user';
import {setProfileUser} from '../slices/profileSlice';
import {checkIsLoading, startAction, stopAction} from '../slices/uiSlice';

export const getUserProfileAsyncAction = createAsyncThunk(
  'profile',
  async (userId: string, {dispatch}) => {
    const ACTION = {
      name: getUserProfileAsyncAction.pending.type,
    };
    dispatch(startAction(ACTION));
    const profile = await getUserProfile(userId);
    dispatch(setProfileUser(profile));
    dispatch(stopAction(ACTION));
  },
);

export const checkIfProfileIsLoading = (state: RootStore) =>
  checkIsLoading(state, getUserProfileAsyncAction.pending.type);
