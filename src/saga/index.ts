import { all, fork } from 'redux-saga/effects';
import watchGetNews from '@/sagas/watchGetNews';

function* saga() {
  yield all([fork(watchGetNews)]);
}

export default saga;
