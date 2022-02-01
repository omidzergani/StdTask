import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import authReducer from '../slices/authSlice';
import uiReducer from '../slices/uiSlice';
import postReducer from '../slices/postSlice';
import chatReducer from '../slices/chatSlice';
import profileReducer from '../slices/profileSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedRootReducer = persistReducer(persistConfig, authReducer);

export default combineReducers({
  auth: persistedRootReducer,
  ui: uiReducer,
  posts: postReducer,
  chat: chatReducer,
  profile: profileReducer,
});
