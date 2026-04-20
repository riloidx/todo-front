import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all active:scale-95 shadow-sm",
        "bg-indigo-600 text-white hover:bg-indigo-700",
        className,
      )}
    >
      {children}
    </button>
  );
}
