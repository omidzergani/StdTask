import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist/es/constants';
import {RootStore} from '..';
import {User} from '../../api/user';

export interface UserState {
  user: Partial<User>;
  isSignedIn: boolean;
  error: boolean;
  message?: string;
}

const initialState: UserState = {
  isSignedIn: false,
  user: {},
  error: false,
  message: undefined,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{user: User; isSignedIn?: boolean}>) {
      state.user = action.payload.user;
      state.isSignedIn = action.payload.isSignedIn;
    },

    setUserError(
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

//selectors
export const selectIsSignedIn = (state: RootStore) => state.auth.isSignedIn;
export const selectUser = (state: RootStore) => state.auth.user;

export const {setUser, setUserError} = authSlice.actions;
export default authSlice.reducer;
