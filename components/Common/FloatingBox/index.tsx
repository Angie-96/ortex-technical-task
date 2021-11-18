import Image from 'next/image';

import styles from './FloatingBox.module.scss';

interface FloatingBoxProps {
  icon: string;
  title: string;
  value: number;
}

const FloatingBox = ({ icon, title, value }: FloatingBoxProps) => {
  return (
    <div className={styles.floatingBoxContainer}>
      <div className={styles.wrapper}>
        <div className={styles.currCountries}>
          <Image src={icon} alt="" width={50} height={50} layout="responsive" />
        </div>
        <div>
          <h5>{title}</h5>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export { FloatingBox };
