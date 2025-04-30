import React from 'react';
import styles from './styles.module.scss';


// inherit from html button attributes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: Size;
    color?: "primary" | "gray" | "red";
    variant?: "text" | "contained" | "outlined" | "link";
}
        
export const Button: React.FC<ButtonProps> = (props) => {
    const { 
        size = "middle", 
        color = "primary",
        variant = "contained",
        ...btnProps 
    } = props;

    // TODO write styles for coresponding props color and size, when pass props color: gray button color is gray, when pass size large button is large width and height
    // use global css variables declare and use for example --blue: #1478a1, use in the styles color: var(--blue)
    const cs = `${styles.Button} ${styles[size]} ${styles[color]} ${styles[variant]}`;

    return (
        <button 
            className={cs}
            {...btnProps}
        >
        </button>
    );
};