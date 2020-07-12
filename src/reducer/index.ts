import { Action, CombinedState, combineReducers } from 'redux';
import news, { NewsStateType } from '@/reducers/news';

import { HYDRATE } from 'next-redux-wrapper';
import { Action as TypeScriptFsaAction } from 'typescript-fsa';

export type StateType = {
  news: NewsStateType;
};

const combinedReducer = combineReducers<StateType>({
  news,
});

type ReducerAction<T> = Action<T> | TypeScriptFsaAction<T>;

const reducer = (
  state: StateType,
  action: ReducerAction<StateType>
): CombinedState<StateType> => {
  if (action.type === HYDRATE && 'payload' in action) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combinedReducer(state, action);
};

export default reducer;
