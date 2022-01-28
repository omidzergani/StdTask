import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer from '../slices/userSlice';
import uiReducer from '../slices/uiSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedRootReducer = persistReducer(persistConfig, userReducer);

export default combineReducers({
  user: persistedRootReducer,
  ui: uiReducer,
});
