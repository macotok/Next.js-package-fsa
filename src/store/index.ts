import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { Store, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import reducer, { StateType } from '../reducer';
import saga from '../saga';

export type SagaStoreType = Store & {
  sagaTask?: Task;
};

const makeStore: MakeStore<StateType> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  (store as SagaStoreType).sagaTask = sagaMiddleware.run(saga);

  return store;
};

export const wrapper = createWrapper<StateType>(makeStore, { debug: true });
