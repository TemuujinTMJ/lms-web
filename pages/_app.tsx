import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

import Layout from '@/components/Layout';
import { store } from '@/modules/store';

import Auth from './auth';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>,
    );
  }

  return (
    <Provider store={store}>
      {getLayout(
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>,
      )}
    </Provider>
  );
}
