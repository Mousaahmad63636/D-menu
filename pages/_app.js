import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import { RestaurantProvider } from '../contexts/RestaurantContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Head>
          <title>Bella Vista Restaurant - Menu</title>
          <meta name="description" content="Fresh, locally-sourced ingredients crafted into memorable dining experiences" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </RestaurantProvider>
    </AuthProvider>
  );
}
