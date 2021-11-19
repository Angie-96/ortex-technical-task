import { motion } from 'framer-motion';
import Image from 'next/image';

import styles from './FloatingBox.module.scss';

interface FloatingBoxProps {
  icon: string;
  title: string;
  value: number;
  lastUpd: number;
}

const FloatingBox = ({ icon, title, value, lastUpd }: FloatingBoxProps) => {
  return (
    <motion.div
      className={styles.floatingBoxContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.wrapper}>
        <div className={styles.currCountries}>
          <Image src={icon} alt="" width={50} height={50} layout="responsive" />
        </div>
        <div>
          <h5>{title}</h5>
          <p>{value}</p>
          <p className={styles.lastUpdate}>
            {new Date(lastUpd).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export { FloatingBox };
