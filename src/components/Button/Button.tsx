import React from "react";

import "./button.css";

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }: ButtonProps) => {
    return (
        <button className="button" onClick={onClick}>
            {text}
        </button>
    );
};


export default Button