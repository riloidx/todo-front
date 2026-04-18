interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  className = "",
  label,
  error,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={rest.id || rest.name} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`
          flex h-10 w-full rounded-lg border-2 bg-white px-4 py-2 text-sm 
          text-slate-700 transition-all placeholder:text-slate-400
          focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none
          disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-indigo-200"}
          ${className}
        `}
      />
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
