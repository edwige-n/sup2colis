// pages/_app.js
import { App } from 'next/app';
import { Router } from 'next/router';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Route is changing to: ${url}`);
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
