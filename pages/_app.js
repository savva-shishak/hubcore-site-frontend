import React from 'react';

import '../styles/index.css';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withStore from '../redux/withStore';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
        <Head>
          <meta name="theme-color" content="#616161" />
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
          <meta name="keywords" content="hubcore, opensource, github" />
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withStore(MyApp);
