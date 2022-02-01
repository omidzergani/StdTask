import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist/es/constants';
import {Chat} from '../../api/collections/collections';
import {User} from '../../api/user';
import {RootStore} from '../index';

interface State {
  users: User[];
  chats: Chat[];
}

const initialState: State = {
  users: [],
  chats: [],
};

const chatsSlices = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    updateChat(
      state,
      action: PayloadAction<{userId: string | number; chat: any}>,
    ) {
      state.users[action.payload.userId] = action.payload.chat;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export function selectUserFromChat(userId: string | number) {
  return (state: RootStore) => state.chat.users[userId];
}

//   (userId: string | number) {
//   return (state: RootStore) => state.chat.users[userId];
// }

export function selectUsers(state: RootStore) {
  return Object.values(state.chat.users);
}
export function selectChats(state: RootStore) {
  return Object.values(state.chat.chats);
}

export function selectChatByUserId(userId: number | string) {
  return (state: RootStore) => {
    return state.chat.chats[userId];
  };
}

export const selectChatByUsers = createSelector(
  selectChats,
  (_: any, users: User['id'][]) => users,
  (chats, users) => {
    return chats.find(chat => chat.users.some(el => users.includes(el)));
  },
);

// export const selectUserFromChat = createSelector(selectUsers, () => {});

export const {setChats, setUsers, updateChat} = chatsSlices.actions;
export default chatsSlices.reducer;
