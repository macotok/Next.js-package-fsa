import axios, { AxiosPromise } from 'axios';

import { GetNewsResultType } from '@/actions/getNews/';
import { MicroCmsQueryType } from '@/constants/microCms/base';

const instance = axios.create({
  baseURL: process.env.API_MICRO_CMS_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.MICRO_CMS_X_API_KEY,
  },
  timeout: 1000,
});

export type GetNewsDataType = GetNewsResultType;

export const getNews = (
  params: MicroCmsQueryType
): AxiosPromise<GetNewsDataType> =>
  instance({
    params,
    method: 'GET',
    url: 'news',
  });
