import type { NextPage } from 'next';
import Head from 'next/head';
import Login from '../components/Login';
import MarketPrices from '../components/MarketPrices';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ORTEX | Login</title>
        <meta name="description" content="ORTEX technical task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Login />
        <MarketPrices />
      </main>
    </>
  );
};

export default Home;
