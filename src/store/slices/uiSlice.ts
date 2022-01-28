import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isEqual} from 'lodash';
import {RootStore} from '../index';
import userSlice from './userSlice';

type Action = {name: string; params?: any};
interface State {
  loader: {
    actions: Action[];
    refreshing: string[];
  };
}

const initialState: State = {
  loader: {
    actions: [],
    refreshing: [],
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startAction(state, action: PayloadAction<Action>) {
      state.loader.actions = [action.payload, ...state.loader.actions];
    },
    stopAction(state, action: PayloadAction<Action>) {
      state.loader.actions = state.loader.actions.filter(el => {
        if (el.name !== action.payload.name) {
          return true;
        } else if (!isEqual(el.params, action.payload.params)) {
          return true;
        } else {
          return false;
        }
      });
    },
    refreshingActionStart(
      state,
      action: PayloadAction<{refreshingAction: string}>,
    ) {
      state.loader.refreshing = [
        ...state.loader.refreshing,
        action.payload.refreshingAction,
      ];
    },
    refreshingActionStop(
      state,
      action: PayloadAction<{refreshingAction: string}>,
    ) {
      state.loader.refreshing = state.loader.refreshing.filter(
        refresh => refresh !== action.payload.refreshingAction,
      );
    },
  },
});

export const checkIsLoading = (
  state: RootStore,
  ...actionsToCheck: string[]
) => {
  return state.ui.loader.actions.some(action =>
    actionsToCheck.includes(action.name),
  );
};

export const checkIfRefreshing = (state: RootStore, actionToCheck: string) => {
  return state.ui.loader.refreshing.some(refresh => refresh === actionToCheck);
};

export const getUpdatingItemsId = (state: RootStore, actionToCheck: string) => {
  const updatingIds = state.ui.loader.actions
    .filter(
      action =>
        action.name === actionToCheck &&
        (typeof action.params?.id === 'number' ||
          typeof action.params?.id === 'string'),
    )
    .map(action => action.params.id);

  return updatingIds;
};
export const {
  refreshingActionStart,
  refreshingActionStop,
  startAction,
  stopAction,
} = uiSlice.actions;
export default uiSlice.reducer;
