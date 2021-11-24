import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FloatingBox } from '../Common/FloatingBox';
import {
  MarketPricesLoader,
  MarketPricesLoaderDesktop,
} from '../Common/Loaders/MarketPricesLoader';

import styles from './MarketPrices.module.scss';

const MarketPrices = () => {
  //Websocket connection
  const [EURUSDMarketPrice, setEURUSDMarketPrice] = useState<any>(null);
  const [GBPUSDMarketPrice, setGBPUSDMarketPrice] = useState<any>(null);
  const [AUDUSDMarketPrice, setAUDUSDMarketPrice] = useState<any>(null);

  useEffect(() => {
    const socketConnection = new WebSocket(
      'wss://stream.tradingeconomics.com/?client=guest:guest',
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

  //Add slash to market price name(topic)

  const topicRegex = (topic: string) => {
    const regex = /(.*)(USD)/;

    return topic.replace(regex, '$1/$2');
  };

  //Loaders for mobile and desktop

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
          title={topicRegex(EURUSDMarketPrice.topic)}
          value={EURUSDMarketPrice.price}
          lastUpdate={EURUSDMarketPrice.dt}
        />
      ) : (
        loader
      )}
      {GBPUSDMarketPrice !== null ? (
        <FloatingBox
          icon={`/icons/${GBPUSDMarketPrice.topic}.svg`}
          title={topicRegex(GBPUSDMarketPrice.topic)}
          value={GBPUSDMarketPrice.price}
          lastUpdate={GBPUSDMarketPrice.dt}
        />
      ) : (
        loader
      )}
      {AUDUSDMarketPrice !== null ? (
        <FloatingBox
          icon={`/icons/${AUDUSDMarketPrice.topic}.svg`}
          title={topicRegex(AUDUSDMarketPrice.topic)}
          value={AUDUSDMarketPrice.price}
          lastUpdate={AUDUSDMarketPrice.dt}
        />
      ) : (
        loader
      )}
    </section>
  );
};

export default MarketPrices;
