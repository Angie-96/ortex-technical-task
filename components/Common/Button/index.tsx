import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  action(): any;
}

const Button = ({ text, action }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={action}>
      {text}
    </button>
  );
};

export { Button };
