import { motion } from 'framer-motion';
import { Input } from '../Input';

import styles from './Modal.module.scss';

interface ModalProps {
  handleClose(): any;
  text: string;
}

const recoverPasswordInputItems = [
  {
    inputName: 'email',
    placeholder: 'Email',
    type: 'text',
    icon: '/icons/at.svg',
    inputValidation: {
      required: true,
    },
  },
];

const Modal = ({ handleClose, text }: ModalProps) => {
  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  return (
    <motion.div
      onClick={handleClose}
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
        <form>
          {recoverPasswordInputItems.map((el) => (
            <Input key={el.inputName} {...el} />
          ))}
        </form>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </motion.div>
  );
};

export { Modal };
