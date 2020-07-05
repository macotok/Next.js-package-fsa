export type MicroCmsQueryType = {
  draftKey?: string;
  limit?: number;
  offset?: number;
  fields?: string;
  filters?: string;
  depth?: number;
};

export type MicroCmsManyResponseType<T> = {
  contents: T[];
  limit: number;
  offset: number;
  totalCount: number;
};

export type MicroCmsHeaderObjectType = {
  xCurrentDateTime: string;
};

export type MicroCmsModelDefaultType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
