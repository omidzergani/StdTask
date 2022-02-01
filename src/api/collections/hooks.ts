import {orderBy} from 'lodash';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {selectUser} from '../../store/slices/authSlice';
import {User} from '../user';

import {
  chatsCollection,
  messagesCollection,
  usersCollection,
} from './collections';

interface Props {
  onUser: (users: any) => void;
  onChat: (chats: any) => void;
  onError?: (error: Error) => void;
  ignoreUserIds?: string[];
  filterByUserId: string;
}
export function useChatsAndUsers({
  onUser,
  onChat,
  onError,
  ignoreUserIds = [''],
  filterByUserId = '',
}: Props) {
  useEffect(() => {
    const subscriber = handleUserSnapShot();
    const chatsSubscriber = handleChatSnapShot();
    return () => {
      subscriber();
      chatsSubscriber();
    };
  }, []);

  const handleUserSnapShot = () => {
    return usersCollection().onSnapshot(usersDoc => {
      const users = {};
      usersDoc.forEach(user => {
        if (ignoreUserIds.includes(user.id)) return;
        users[user.id] = {
          id: user.id,
          ...user.data(),
        };
      });
      onUser(users);
    }, onError);
  };
  const handleChatSnapShot = () => {
    return chatsCollection()
      .where('users', 'array-contains', filterByUserId)
      .onSnapshot(chatDoc => {
        const chats = {};
        chatDoc.forEach(chat => {
          const data = chat.data();
          chats[data.user_id] = {
            ...data,
            id: chat.id,
            started_at: data.started_at?.seconds,
            last_message_at: data.last_message_at?.seconds,
          };
        });
        onChat(chats);
      }, onError);
  };
}

export function useMessages({chatId = ''}) {
  const user = useAppSelector(selectUser);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messagesCollection()
      .where('chat_id', '==', chatId)
      .onSnapshot(messageDoc => {
        const messages = [];
        messageDoc.forEach(el => {
          const data = el.data();
          messages.push({
            id: el.id,
            ...data,
            isByThisUser: user.id == data.sender_id,
            sent_at: data.sent_at?.seconds,
          });
        });

        setMessages(orderBy(messages, el => el.sent_at));
      });
  }, []);

  return messages;
}
