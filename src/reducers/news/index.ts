import { Action, isType } from 'typescript-fsa';
import { HYDRATE } from 'next-redux-wrapper';
import { StateType } from '../../reducer';
import getNewsAction, { GetNewsResultType } from '../../actions/getNews';

export type NewsStateType = {
  error: {
    message: string;
  };
  result: GetNewsResultType;
};

const initialState: Readonly<NewsStateType> = {
  error: {
    message: '',
  },
  result: {
    contents: [],
    limit: 0,
    offset: 0,
    totalCount: 0,
  },
};

const news = (
  state = initialState,
  action: Action<StateType>
): NewsStateType => {
  const { type } = action;

  if (type === HYDRATE) {
    const {
      payload: { news },
    } = action;

    return Object.assign({}, state, news);
  }

  if (isType(action, getNewsAction.done)) {
    const {
      payload: { result },
    } = action;

    return Object.assign({}, state, { result });
  }

  if (isType(action, getNewsAction.failed)) {
    const {
      payload: {
        error: { message },
      },
    } = action;

    return Object.assign({}, state, { error: { message } });
  }

  return state;
};

export default news;
