interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${"flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 active:scale-95 shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white"} ${className}`}
    >
      {children}
    </button>
  );
}
