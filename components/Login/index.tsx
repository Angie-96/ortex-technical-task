import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { Modal } from '../Common/Modal';
import styles from './Login.module.scss';

const Login = () => {
  const { handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = React.useState(false);

  const onSubmit = (formData: object) => {
    console.log(formData);
    reset();
  };

  const inputItems = [
    {
      inputName: 'email',
      placeholder: 'Email',
      type: 'text',
      icon: '/icons/at.svg',
      inputValidation: {
        required: true,
      },
    },
    {
      inputName: 'password',
      placeholder: 'Password',
      type: 'password',
      icon: '/icons/password.svg',
      inputValidation: {
        required: true,
        minLength: {
          value: 4,
          message: 'Password min length is 4.',
        },
        maxLength: {
          value: 8,
          message: 'Password max length is 8.',
        },
      },
    },
  ];

  return (
    <section className={styles.formSection}>
      <div className={styles.formHeader}>
        <Image src="/ortex.svg" alt="Ortex Logo" width={130} height={67} />
        <p>Welcome back!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        {inputItems.map((el) => (
          <Input key={el.inputName} {...el} />
        ))}
        <div className={styles.recoverPassword}>
          <Button
            text="Forgot your password?"
            action={() => setShowModal(!showModal)}
          />
        </div>
        <Button text="Submit" action={handleSubmit(onSubmit)} />
      </form>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {showModal && (
          <Modal
            text="Enter your email address to get reset instructions sent to you."
            handleClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Login;
