import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import { Input } from '../Input';

import styles from './Modal.module.scss';
import { useForm } from 'react-hook-form';

interface ModalProps {
  handleClose(): any;
  text: string;
}

interface formDataProps {
  email: string;
}

const Modal = ({ handleClose, text }: ModalProps) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmitRecoverPassword = (formData: formDataProps) => {
    const emailAccount = formData.email;
    alert(
      `We’ve sent instructions on how to reset your password to ${emailAccount}`,
    );
    handleClose();
    reset();
  };

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
        <div className={styles.closeBtn}>
          <button onClick={handleClose}>
            <Image src="/icons/cross.svg" alt="" width={30} height={30} />
          </button>
        </div>
        <p>{text}</p>
        <form onSubmit={handleSubmit(onSubmitRecoverPassword)}>
          <Input
            placeholder="Email"
            type="text"
            icon="/icons/at.svg"
            register={{
              ...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address.',
                },
              }),
            }}
            error={
              errors.email && (
                <span className="isRequired">{errors.email.message}</span>
              )
            }
          />
        </form>
        <Button action={handleSubmit(onSubmitRecoverPassword)} text="Send" />
      </motion.div>
    </motion.div>
  );
};

export { Modal };
