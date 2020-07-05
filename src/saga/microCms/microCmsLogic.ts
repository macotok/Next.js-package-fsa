import {
  MicroCmsHeaderObjectType,
  MicroCmsQueryType,
} from '@/constants/microCms/base';
import { AsyncActionCreators } from 'typescript-fsa/src/index';
import { SagaIterator } from 'redux-saga';
import { fork, take } from 'redux-saga/effects';

export const convertHeaderObject = (header: {
  [key: string]: string;
}): MicroCmsHeaderObjectType => {
  const xCurrentDateTime = header['x-current-date-time'] || '';

  return {
    xCurrentDateTime,
  };
};

export const getSagaIterator = <ApiResponse, Result, Error>(
  worker: (...args: any[]) => any,
  action: AsyncActionCreators<MicroCmsQueryType, Result, Error>
) => {
  return function* watcher(): SagaIterator {
    while (true) {
      const { payload }: ReturnType<typeof action.started> = yield take(
        action.started
      );

      try {
        yield fork(worker, payload);
      } catch (e) {
        console.error(e);
      }
    }
  };
};
