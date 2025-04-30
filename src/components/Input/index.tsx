//import classNames from "classnames";
import styles from "./styles.module.scss"
import { classnames } from "../../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  inputSize?: Size;
  error?: string | React.ReactNode;
  prefixIcon?: React.ReactNode;
  prefixPosition?: "start" | "end";
  onClickPrefix?: (arg: any) => any;
  prefixIconstyle?: object;
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, inputSize = "middle", error, className, prefixIcon, prefixPosition = "start", onClickPrefix, ...restProps } = props;

  // const cs = `${styles.Input} ${inputSize ? styles[inputSize] : ""} ${restProps.disabled ? styles.Disabled : ""} ${error ? styles.Error : ""} ${styles[`prefix-${prefixPosition}`]}`;

  // // TODO make a global function that passes classnames with the condition, returns a string for the classname where corresponding true
  // // example
  // // classnames({
  // //     Input: true,
  // //     Disabled: true,
  // //     Error: false,
  // // }); returned "Input Disabled"

  // // TODO replace classnames list with top logic 

  // const csInput = `${styles.inputElement} ${!error && !!restProps.value ? styles.inputSuccess : ""} ${error ? styles.inputError : ""} ${className ?? ""}`;

  const cs = classnames({
    [styles.Input]: true,
    [styles[inputSize]]: inputSize,  
    [styles.Disabled]: restProps.disabled,  
    [styles.Error]: error, 
    [styles[`prefix-${prefixPosition}`]]: true, 
    [styles.className]: className,  
  });

  const csInput = classnames({
    [styles.inputElement]: true,
    [styles.inputSuccess]: !error && !!restProps.value,
    [styles.inputError]: !!error,
    [styles.className]: className ?? "",
  });

  return (
    <div className={cs}>
      {label && <span className={styles.Label}>{label}</span>}
      <span className={styles.InputWrapper}>
        <input
          className={csInput}
          {...restProps}
        />
        {prefixIcon && <span className={styles.IconPrefix} onClick={onClickPrefix}>{prefixIcon}</span>}
      </span>
      {error && <span className={styles.inputErrorMessage}>{error}</span>}
    </div>
  );
};