import { ReactNode } from "react";

type ButtonProps = {
    text: string | ReactNode;
    customize?: string;
    title?: string;
    disabled?: boolean;
    onClick: () => void;
};

export const Button = ({ text, customize, title, disabled, onClick }: ButtonProps) => (
    <button className={`text-white p-2 rounded hover:scale-105 duration-300 ${customize}`}
        onClick={onClick}
        title={title}
        disabled={disabled}>
        {text}
    </button>
)