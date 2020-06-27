import { combineReducers } from 'redux';
import news, { NewsStateType } from '@/reducers/news';

export type StateType = {
  news: NewsStateType;
};

const reducer = combineReducers<StateType>({
  news,
});

export default reducer;
