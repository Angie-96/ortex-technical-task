import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import styles from './Input.module.scss';

interface InputProps {
  inputName: string;
  placeholder: string;
  type: string;
  icon: string;
  inputValidation: object;
}

const Input = ({
  inputName,
  placeholder,
  type,
  icon,
  inputValidation,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputIcon}>
        <Image src={icon} alt="Input Logo" width={25} height={25} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...(register(inputName), () => inputValidation)}
      />

      {errors && <span className="isRequired">{errors.message}</span>}
    </div>
  );
};

export { Input };
