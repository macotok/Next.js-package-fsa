import 'ress';

import { AppProps } from 'next/app';
import { NextPage } from 'next';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
