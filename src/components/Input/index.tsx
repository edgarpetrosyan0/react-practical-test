import classNames from "classnames";
import styles from "./styles.module.scss"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>  {
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
     // TODO make a global function that passes classnames with the condition, returns a string for the classname where corresponding true
    // example
    // classnames({
    //     Input: true,
    //     Disabled: true,
    //     Error: false,
    // }); returned "Input Disabled"
    
    // TODO replace classnames list with top logic 
    
    const cs = classNames(
        styles.Input,
        styles[`prefix-${prefixPosition}`],
        styles[inputSize],
        {
          [styles.Disabled]: restProps.disabled,
          [styles.Error]: !!error,
        }
      );
    
      const csInput = classNames(
        styles.inputElement,
        {
          [styles.inputSuccess]: !error && !!restProps.value,
          [styles.inputError]: !!error,
        },
        className
      );
    
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