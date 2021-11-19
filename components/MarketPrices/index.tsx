import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FloatingBox } from '../Common/FloatingBox';
import {
  MarketPricesLoader,
  MarketPricesLoaderDesktop,
} from '../Common/Loaders/MarketPricesLoader';
import { useMediaQuery } from '../Common/MediaQuery';

import styles from './MarketPrices.module.scss';

const marketPricesMockup = [
  { topic: 'GBPUSD', price: 1.3474 },
  { topic: 'AUDUSD', price: 0.726 },
];

const MarketPrices = () => {
  const [EURUSDMarketPrice, setEURUSDMarketPrice] = useState<any>(null);
  const [GBPUSDMarketPrice, setGBPUSDMarketPrice] = useState<any>(null);
  const [AUDUSDMarketPrice, setAUDUSDMarketPrice] = useState<any>(null);

  useEffect(() => {
    const socketConnection = new WebSocket(
      'ws://stream.tradingeconomics.com/?client=guest:guest',
    );
    socketConnection.onopen = (event: any) => {
      if (event.currentTarget.readyState == 1) {
        socketConnection.send(
          JSON.stringify({ topic: 'subscribe', to: 'EURUSD:CUR' }),
        );
        socketConnection.send(
          JSON.stringify({ topic: 'subscribe', to: 'GBPUSD:CUR' }),
        );
        socketConnection.send(
          JSON.stringify({ topic: 'subscribe', to: 'AUDUSD:CUR' }),
        );

        socketConnection.onmessage = (message) => {
          const data = JSON.parse(message.data);

          switch (data.topic) {
            case 'EURUSD':
              setEURUSDMarketPrice(data);
              break;
            case 'GBPUSD':
              setGBPUSDMarketPrice(data);
              break;
            case 'AUDUSD':
              setAUDUSDMarketPrice(data);
              break;
          }
        };
      }
    };
  }, []);

  const isDesktop = useMediaQuery('(min-width: 992px)');

  const loader = isDesktop ? (
    <div className={styles.loaderContainer}>
      <MarketPricesLoaderDesktop />
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <MarketPricesLoader />
    </div>
  );

  return (
    <section className={styles.marketPricesContainer}>
      {EURUSDMarketPrice !== null ? (
        <FloatingBox
          icon={`/icons/${EURUSDMarketPrice.topic}.svg`}
          title={EURUSDMarketPrice.topic}
          value={EURUSDMarketPrice.price}
          lastUpd={EURUSDMarketPrice.dt}
        />
      ) : (
        loader
      )}
      {GBPUSDMarketPrice !== null ? (
        <FloatingBox
          icon={`/icons/${GBPUSDMarketPrice.topic}.svg`}
          title={GBPUSDMarketPrice.topic}
          value={GBPUSDMarketPrice.price}
          lastUpd={GBPUSDMarketPrice.dt}
        />
      ) : (
        loader
      )}
      {AUDUSDMarketPrice !== null ? (
        <FloatingBox
          icon={`/icons/${AUDUSDMarketPrice.topic}.svg`}
          title={AUDUSDMarketPrice.topic}
          value={AUDUSDMarketPrice.price}
          lastUpd={AUDUSDMarketPrice.dt}
        />
      ) : (
        loader
      )}
    </section>
  );
};

export default MarketPrices;
