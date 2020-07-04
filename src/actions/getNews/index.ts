import { AxiosError } from 'axios';
import actionCreatorFactory from 'typescript-fsa';
import {
  MicroCmsQueryType,
  MicroCmsManyResponseType,
} from '@/constants/microCms/base';
import { NewsContentsType } from '@/constants/microCms/news';

export type GetNewsResultType = MicroCmsManyResponseType<NewsContentsType>;

export type GetNewsError = AxiosError;

const actionCreator = actionCreatorFactory();
const getNewsAction = actionCreator.async<
  MicroCmsQueryType,
  GetNewsResultType,
  GetNewsError
>('GET_NEWS');

export default getNewsAction;
