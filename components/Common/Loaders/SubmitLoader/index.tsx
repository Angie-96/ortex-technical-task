import ContentLoader from 'react-content-loader';

interface SubmitLoaderProps {
  backgroundColor: string;
  foregroundColor: string;
}

const SubmitLoader = (props: SubmitLoaderProps) => (
  <ContentLoader
    uniqueKey="SubmitLoader"
    viewBox="0 0 240 80"
    height={80}
    width={240}
    {...props}
  >
    <circle cx="40%" cy="50%" r="6" />
    <circle cx="50%" cy="50%" r="6" />
    <circle cx="60%" cy="50%" r="6" />
  </ContentLoader>
);

export { SubmitLoader };
