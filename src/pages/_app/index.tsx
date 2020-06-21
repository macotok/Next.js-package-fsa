import 'ress';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from '../../store';

const WrapperApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(WrapperApp);
