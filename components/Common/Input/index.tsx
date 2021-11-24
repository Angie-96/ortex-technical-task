import React, { InputHTMLAttributes } from 'react';
import Image from 'next/image';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  icon: string;
  register: object;
  error: string;
}

const Input = ({
  placeholder,
  type,
  icon,
  register,
  error,
  ...rest
}: InputProps) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputIcon}>
          <Image src={icon} alt="Input Logo" width={25} height={25} />
        </div>
        <input type={type} placeholder={placeholder} {...rest} {...register} />
      </div>
      {error}
    </>
  );
};

export { Input };
