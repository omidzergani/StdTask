import {createAsyncThunk} from '@reduxjs/toolkit';
import {Chat, sendMessage, startChat} from '../../api/collections/collections';
import {User} from '../../api/user';

import {getUpdatingItemsId, startAction, stopAction} from '../slices/uiSlice';
import {selectUser} from '../slices/authSlice';

export const startChatAsyncAction = createAsyncThunk(
  'chat',
  async (data: {toUserId: string}, {dispatch, getState}) => {
    const ACTION = {
      name: startChatAsyncAction.pending.type,
      params: {id: data.toUserId},
    };
    dispatch(startAction(ACTION));
    const user = selectUser(getState() as any);
    await startChat(user.id, data.toUserId);

    dispatch(stopAction(ACTION));
  },
);

export const checkIfStartChatIsLoading = (userId: string) => store =>
  getUpdatingItemsId(store, startChatAsyncAction.pending.type).includes(userId);

export const sendMessageAsyncAction = createAsyncThunk(
  'chat',
  async (
    data: {chatId: Chat['id']; userId: User['id']; text: string},
    {dispatch},
  ) => {
    const ACTION = {
      name: startChatAsyncAction.pending.type,
      params: {id: data.chatId},
    };
    dispatch(startAction(ACTION));

    await sendMessage({
      chatId: data.chatId,
      text: data.text,
      userId: data.userId,
    });

    dispatch(stopAction(ACTION));
  },
);

export const checkIfSendMessageIsLoading = (chatId: string) => (store: any) =>
  getUpdatingItemsId(store, sendMessageAsyncAction.pending.type).includes(
    chatId,
  );
