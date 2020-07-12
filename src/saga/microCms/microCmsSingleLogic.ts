import { AxiosPromise, AxiosResponse } from 'axios';
import {
  MicroCmsHeaderObjectType,
  MicroCmsModelDefaultType,
  MicroCmsQueryType,
} from '@/constants/microCms/base';
import {
  convertHeaderObject,
  getSagaIterator,
} from '@/saga/microCms/microCmsLogic';

import { AsyncActionCreators } from 'typescript-fsa/src/index';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { call } from 'redux-saga/effects';

type SingleRequestType<T> = (params: MicroCmsQueryType) => AxiosPromise<T>;
type GenerateSagaIteratorType = () => SagaIterator;
export type SagaIteratorSingleResponseType<T> = {
  data: T;
  header: MicroCmsHeaderObjectType;
};

export const makeWatch = <
  ApiResponse extends MicroCmsModelDefaultType,
  Result,
  Error
>(
  request: SingleRequestType<ApiResponse>,
  action: AsyncActionCreators<MicroCmsQueryType, Result, Error>
): GenerateSagaIteratorType => {
  const options = {
    skipStartedAction: true,
  };

  const iterator = getMicroCmsSagaIterator<ApiResponse>(request);

  const worker = bindAsyncAction(action, options)(iterator);

  return getSagaIterator<ApiResponse, Result, Error>(worker, action);
};

const getMicroCmsSagaIterator = <ApiResponse>(
  request: SingleRequestType<ApiResponse>
) => {
  return function* (
    params: MicroCmsQueryType
  ): SagaIterator<SagaIteratorSingleResponseType<ApiResponse>> {
    const response: AxiosResponse<ApiResponse> = yield call(request, params);

    return {
      data: response.data,
      header: convertHeaderObject(response.headers),
    };
  };
};
