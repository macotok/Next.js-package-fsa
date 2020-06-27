import { SagaIterator } from 'redux-saga';
import { call, fork, take } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import getNews from '@/api';
import getNewsAction, { GetNewsResultType } from '@/actions/getNews';

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
      yield fork(getNewsWorker, payload);
    } catch (e) {
      throw e;
    }
  }
}

export default watchGetNews;
