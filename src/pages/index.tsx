import React, { FC } from 'react';
import { END } from 'redux-saga';
import { NewsStateType } from '../reducers/news';
import { wrapper, SagaStoreType } from '../store';
import getNewsAction from '../actions/getNews';

type NewsPagePropsType = {
  news: NewsStateType;
};

const HomePage: FC<NewsPagePropsType> = ({ news }) => {
  const {
    result: { contents },
  } = news;

  return (
    <>
      <div>Welcome to Next.js!</div>
      {contents.map(
        ({ title, description }: { title: string; description: string }) => (
          <>
            <p>{title}</p>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </>
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
