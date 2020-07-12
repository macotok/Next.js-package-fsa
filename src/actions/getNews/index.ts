import {
  MicroCmsManyResponseType,
  MicroCmsQueryType,
} from '@/constants/microCms/base';

import { AxiosError } from 'axios';
import { NewsContentsType } from '@/constants/microCms/news';
import actionCreatorFactory from 'typescript-fsa';

export type GetNewsResultType = MicroCmsManyResponseType<NewsContentsType>;

export type GetNewsError = AxiosError;

const actionCreator = actionCreatorFactory();
const getNewsAction = actionCreator.async<
  MicroCmsQueryType,
  GetNewsResultType,
  GetNewsError
>('GET_NEWS');

export default getNewsAction;
