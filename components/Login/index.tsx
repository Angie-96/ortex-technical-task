import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { SubmitLoader } from '../Common/Loaders/SubmitLoader';
import { Modal } from '../Common/Modal';

import styles from './Login.module.scss';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: FormData) => {
    setIsLoggingIn(true);

    // This will fail when using the static version of the site,
    // because it's trying to connect to Next's API.
    // This could be fixed by running the site as SSR instead of static,
    // or by connecting to a different site serving the API (e.g. an express API).

    axios
      .post('/api/login', formData)
      .then(() => {
        setTimeout(() => {
          setIsLoggingIn(false);
          reset();
          alert('You logged in successfully.');
        }, 1500);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoggingIn(false);
          alert('Oops, an error occurred, try again later.');
        }, 1500);
      });
  };

  //Framer Motion animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const childrenVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.section
      className={styles.formSection}
      variants={sectionVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={childrenVariants} className={styles.formHeader}>
        <Image src="/ortex.svg" alt="Ortex Logo" width={130} height={67} />
        <p>Welcome back!</p>
      </motion.div>
      <motion.form
        variants={childrenVariants}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.loginForm}
      >
        <Input
          placeholder="Email"
          type="text"
          icon="/icons/at.svg"
          register={{
            ...register('email', {
              required: 'Email is required.',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
        <Input
          placeholder="Password"
          type="password"
          icon="/icons/password.svg"
          register={{
            ...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 4,
                message: 'Password min length is 4.',
              },
              maxLength: {
                value: 8,
                message: 'Password max length is 8.',
              },
            }),
          }}
          error={
            errors.password && (
              <span className="isRequired">{errors.password.message}</span>
            )
          }
        />
        <div className={styles.recoverPassword}>
          <Button
            type="button"
            text="Forgot your password?"
            action={() => setShowModal(true)}
          />
        </div>
        {isLoggingIn ? (
          <SubmitLoader
            backgroundColor="#ffffff21"
            foregroundColor="#ffffff45"
          />
        ) : (
          <Button type="submit" text="Submit" action={handleSubmit(onSubmit)} />
        )}
      </motion.form>
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
    </motion.section>
  );
};

export default Login;
