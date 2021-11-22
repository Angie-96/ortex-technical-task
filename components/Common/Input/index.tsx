import React from 'react';
import Image from 'next/image';

import styles from './Input.module.scss';

interface InputProps {
  placeholder: string;
  type: string;
  icon: string;
  register: object;
  error: string;
}

const Input = ({ placeholder, type, icon, register, error }: InputProps) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputIcon}>
          <Image src={icon} alt="Input Logo" width={25} height={25} />
        </div>
        <input type={type} placeholder={placeholder} {...register} />
      </div>
      {error}
    </>
  );
};

export { Input };
