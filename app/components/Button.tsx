type ButtonProps = {
    text: string;
    customize?: string;
    onClick: () => void;
};

export const Button = ({ text, customize, onClick }: ButtonProps) => (
    <button className={`text-white p-2 rounded hover:scale-105 duration-300 ${customize}`}
        onClick={onClick}>
        {text}
    </button>
)