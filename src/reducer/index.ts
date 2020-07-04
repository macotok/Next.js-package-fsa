import { CombinedState, combineReducers } from 'redux';
import { Action } from 'typescript-fsa';
import { HYDRATE } from 'next-redux-wrapper';
import news, { NewsStateType } from '@/reducers/news';

export type StateType = {
  news: NewsStateType;
};

const combinedReducer = combineReducers<StateType>({
  news,
});

const reducer = (
  state: StateType,
  action: Action<StateType>
): CombinedState<StateType> => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combinedReducer(state, action);
};

export default reducer;
