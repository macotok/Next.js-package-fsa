import 'ress';

import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from '@/store';

dayjs.locale('ja');

const WrapperApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(WrapperApp);
