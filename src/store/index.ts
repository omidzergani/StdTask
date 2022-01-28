import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  REGISTER,
  REHYDRATE,
  PERSIST,
  PURGE,
} from 'redux-persist';
import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [PAUSE, FLUSH, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const Persistor = persistStore(store);

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
