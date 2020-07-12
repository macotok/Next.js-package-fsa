import { call, take } from 'redux-saga/effects';
import getNewsAction, { GetNewsResultType } from '@/actions/getNews';

import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { getNews } from '@/api';

const getNewsWorker = bindAsyncAction(getNewsAction, {
  skipStartedAction: true,
})(function* (params): SagaIterator<GetNewsResultType> {
  try {
    const { data }: AxiosResponse<GetNewsResultType> = yield call(
      getNews,
      params
    );

    return data;
  } catch (e) {
    throw e;
  }
});

function* watchGetNews(): SagaIterator {
  while (true) {
    const { payload }: ReturnType<typeof getNewsAction.started> = yield take(
      getNewsAction.started
    );

    try {
      yield call(getNewsWorker, payload);
    } catch (e) {
      throw e;
    }
  }
}

export default watchGetNews;
