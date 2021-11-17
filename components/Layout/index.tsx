import styles from './Layout.module.scss';

const Layout = ({ children }: any) => {
  return (
    <>
      <div className={styles.videoBgContainer}>
        <video loop autoPlay>
          <source
            src="https://public.ortex.com/wp-content/uploads/2020/09/iStock-1002667230-1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
