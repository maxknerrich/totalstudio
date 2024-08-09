import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
};

export default function Button({ children = "", ...props }: ButtonProps) {
    return (
        <button className="px-6 py-2 bg-slate-500 rounded-sm bold" {...props}>
            {children}
        </button>
    );
}
