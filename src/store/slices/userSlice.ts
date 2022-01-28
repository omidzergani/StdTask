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

const userSlice = createSlice({
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
export const selectIsSignedIn = (state: RootStore) => state.user.isSignedIn;
export const selectUser = (state: RootStore) => state.user.user;

export const {setUser, setUserError} = userSlice.actions;
export default userSlice.reducer;
