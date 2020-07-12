import { SagaStoreType, wrapper } from '@/store';

import { END } from 'redux-saga';
import { NewsStateType } from '@/reducers/news';
import { NextPage } from 'next';
import React from 'react';
import getNewsAction from '@/actions/getNews';

type NewsPagePropsType = {
  news: NewsStateType;
};

const HomePage: NextPage<NewsPagePropsType> = ({ news }) => {
  const {
    result: { contents },
  } = news;

  return (
    <>
      <div>Welcome to Next.js!</div>
      {contents.map(
        (
          { title, description }: { title: string; description: string },
          index
        ) => (
          <div key={index}>
            <p>{title}</p>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(getNewsAction.started({}));
    store.dispatch(END);

    await (store as SagaStoreType).sagaTask?.toPromise();
    const { news } = store.getState();

    return {
      props: {
        news,
      },
    };
  }
);

export default HomePage;
