import styles from './Layout.module.scss';

const Layout = ({ children }: any) => {
  return (
    <>
      <div className={styles.videoBgContainer}>
        <video loop autoPlay>
          <source src="/video/ortex-bg-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
