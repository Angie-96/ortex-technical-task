import ContentLoader from 'react-content-loader';

const MarketPricesLoader = () => (
  <ContentLoader
    uniqueKey="MarketPricesLoader"
    backgroundColor="#ffffff21"
    foregroundColor="#ffffff45"
    viewBox="0 0 102 120"
  >
    <circle cx="40%" cy="20%" r="18" />
    <circle cx="57%" cy="35%" r="18" />
    <rect x="10" y="60%" rx="4" ry="4" width="80%" height="11" />
    <rect x="10" y="80%" rx="3" ry="3" width="60%" height="8" />
  </ContentLoader>
);

const MarketPricesLoaderDesktop = () => (
  <ContentLoader
    uniqueKey="MarketPricesLoaderDesktop"
    backgroundColor="#ffffff21"
    foregroundColor="#ffffff45"
    viewBox="0 0 250 80"
  >
    <circle cx="13%" cy="41%" r="18" />
    <circle cx="20%" cy="61%" r="18" />
    <rect x="80" y="26" rx="4" ry="4" width="140" height="11" />
    <rect x="80" y="46" rx="3" ry="3" width="130" height="8" />
  </ContentLoader>
);

export { MarketPricesLoader, MarketPricesLoaderDesktop };
