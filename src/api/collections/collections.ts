import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {User} from '../user';

export interface ChatBody {
  user_id: User['id'];
  users: User['id'][];
  started_at: any;
  last_message_at: any;
  last_message: string;
}

export interface Chat extends ChatBody {
  id: string;
}

export interface Message {
  id: string;
  sender_id: number;
  receiver_id: number;
  chat_id: number;
  sent_at: string;
  text: string;
}

firestore().settings({
  persistence: false,
});

export function usersCollection() {
  return firestore().collection('users');
}
export function chatsCollection() {
  return firestore().collection('chats');
}
export function messagesCollection() {
  return firestore().collection('messages');
}

//users
export async function getUsersFromDB({userIdToFilterOut = ''} = {}) {
  const users = {};
  const usersDoc = await usersCollection().get();
  usersDoc.forEach(el => {
    if (el.id === userIdToFilterOut) return;
    users[el.id] = el.data();
  });
  return users;
}

export async function addUserToDB({
  email,
  firstName,
  id,
  lastName,
  online = true,
}: User) {
  const user = usersCollection().doc(id);

  await user.set({
    email,
    online,
    first_name: firstName,
    last_name: lastName,
    id,
  });

  return (await user.get()).data();
}

export async function setUserOnline(userId: string, isOnline: boolean = false) {
  const selectedUser = usersCollection().doc(userId);

  await selectedUser.update({
    online: isOnline,
  });

  const user = await selectedUser.get();
  return {id: user.id, ...user.data()};
}

// chats

export async function getChatsFromDB() {
  const chatDoc = await chatsCollection().get();
  const chats = {};
  chatDoc.forEach(async el => {
    const chatData = el.data();
    chats[el.id] = chatData;
  });
  return chats;
}

export async function getChatByUserId(userId: string) {
  const chatDoc = await chatsCollection().where('user_id', '==', `1`).get();
  if (chatDoc.size > 0) {
    const chat = chatDoc.docs[0];
    const chatData = chat.data();
    return {
      id: chat.id,
      ...chatData,
    };
  }
  return undefined;
}

export async function startChat(userId: string, to_user: string) {
  return await chatsCollection().add({
    user_id: userId,
    users: [userId, to_user],
    started_at: firestore.FieldValue.serverTimestamp(),
    last_message_at: firestore.FieldValue.serverTimestamp(),
    last_message: '',
  });
}

export async function setLastMessageInChat(
  chatId: string,
  messageText: string,
  messageSentTime: any,
) {
  return await chatsCollection().doc(chatId).update({
    last_message_at: messageSentTime,
    last_message: messageText,
  });
}

//messages
interface SendMessageData {
  userId: string;
  chatId: string;
  text: string;
}
export async function sendMessage({userId, chatId, text}: SendMessageData) {
  const time = firestore.Timestamp.now();
  const message = await (
    await messagesCollection().add({
      chat_id: chatId,
      sender_id: userId,
      sent_at: time,
      text,
    })
  ).get();
  const messageData = {id: message.id, ...message.data()};
  await setLastMessageInChat(chatId, text, messageData['sent_at']);
  return messageData;
}

export async function getMessages(chatId: string) {
  const message = await messagesCollection()
    .where('chat_id', '==', chatId)
    .get();
  const messages = [];

  message.forEach;

  return messages;
}
