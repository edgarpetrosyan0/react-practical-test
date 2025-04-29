import React from 'react';
import styles from './styles.module.scss';

// TODO needed ButtonProps type interface to inherit from default html button attributes
// for example pass onClick method, disabled, etc 
export interface ButtonProps {
    size?: Size;
    color?: "primary" | "gray" | "red";
    variant?: "text" | "contained" | "outlined" | "link";
    children: any, // TODO remove this type when to inherit default attributes 
}
        
export const Button: React.FC<ButtonProps> = (props) => {
    const { 
        children, 
        size = "middle", 
        color = "primary",
        variant = "contained",
        ...btnProps 
    } = props;

    // TODO write styles for coresponding props color and size, when pass props color: gray button color is gray, when pass size large button is large width and height
    // use global css variables declare and use for example --blue: #1478a1, use in the styles color: var(--blue)
    const cs = `${styles.Button}`;

    return (
        <button 
            className={cs}
            {...btnProps}
        >
            {children}
        </button>
    );
};