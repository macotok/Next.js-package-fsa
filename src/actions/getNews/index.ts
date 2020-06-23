import { AxiosError } from 'axios';
import actionCreatorFactory from 'typescript-fsa';

export type MicroCmsQueryType = {
  draftKey?: string;
  limit?: number;
  offset?: number;
  fields?: string;
  filters?: string;
  depth?: number;
};

type NewsContentsType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
};

export type GetNewsResultType = {
  contents: NewsContentsType[];
  limit: number;
  offset: number;
  totalCount: number;
};

export type GetNewsError = AxiosError;

const actionCreator = actionCreatorFactory();
const getNewsAction = actionCreator.async<
  MicroCmsQueryType,
  GetNewsResultType,
  GetNewsError
>('GET_NEWS');

export default getNewsAction;
