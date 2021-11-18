import { useEffect, useState } from 'react';
import { FloatingBox } from '../Common/FloatingBox';

import styles from './MarketPrices.module.scss';

const marketPricesMockup = [
  { topic: 'GBPUSD', price: 1.3474 },
  { topic: 'AUDUSD', price: 0.726 },
];

const MarketPrices = () => {
  const [marketPrice, setMarketPrice] = useState<any>(null);

  useEffect(() => {
    const socketConnection = new WebSocket(
      'ws://stream.tradingeconomics.com/?client=guest:guest',
    );
    socketConnection.onopen = (event: any) => {
      if (event.currentTarget.readyState == 1) {
        socketConnection.send(
          JSON.stringify({ topic: 'subscribe', to: 'EURUSD:CUR' }),
        );
        socketConnection.onmessage = (message) => {
          const data = JSON.parse(message.data);

          if (data.topic === 'EURUSD') {
            setMarketPrice(data);
          }
        };
      }
    };
  }, []);

  if (marketPrice !== null) {
    console.log(new Date(marketPrice.dt).toLocaleString());
  }

  return (
    <section className={styles.marketPricesContainer}>
      {marketPrice !== null ? (
        <FloatingBox
          icon={`/icons/${marketPrice.topic}.svg`}
          title={marketPrice.topic}
          value={marketPrice.price}
        />
      ) : (
        ''
      )}
      {marketPricesMockup.map((mPrice) => (
        <FloatingBox
          key={mPrice.topic}
          icon={`/icons/${mPrice.topic}.svg`}
          title={mPrice.topic}
          value={mPrice.price}
        />
      ))}
    </section>
  );
};

export default MarketPrices;
