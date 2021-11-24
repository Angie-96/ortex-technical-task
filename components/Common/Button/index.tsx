import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  action: () => void;
}

const Button = ({ text, action, ...rest }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={action} {...rest}>
      {text}
    </button>
  );
};

export { Button };
