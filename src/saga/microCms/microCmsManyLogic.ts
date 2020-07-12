import { AxiosPromise, AxiosResponse } from 'axios';
import {
  MicroCmsHeaderObjectType,
  MicroCmsManyResponseType,
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

type ManyRequestType<T> = (params: MicroCmsQueryType) => AxiosPromise<T>;

type GenerateSagaIterator = () => SagaIterator;

export type SagaIteratorManyResponseType<T> = {
  data: T;
  header: MicroCmsHeaderObjectType;
};

export const makeWatch = <
  ApiResponse extends MicroCmsManyResponseType<MicroCmsModelDefaultType>,
  Result,
  Error
>(
  request: ManyRequestType<ApiResponse>,
  action: AsyncActionCreators<MicroCmsQueryType, Result, Error>
): GenerateSagaIterator => {
  const options = {
    skipStartedAction: true,
  };

  const iterator = getMicroCmsSagaIterator<ApiResponse>(request);

  const worker = bindAsyncAction(action, options)(iterator);

  return getSagaIterator<ApiResponse, Result, Error>(worker, action);
};

const getMicroCmsSagaIterator = <ApiResponse>(
  request: ManyRequestType<ApiResponse>
) => {
  return function* (
    params: MicroCmsQueryType
  ): SagaIterator<SagaIteratorManyResponseType<ApiResponse>> {
    const response: AxiosResponse<ApiResponse> = yield call(request, params);

    return {
      data: response.data,
      header: convertHeaderObject(response.headers),
    };
  };
};
