import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-gray-700">{label}</label>}

      <input
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-brand-500
          ${className}`}
        {...props}
      />
    </div>
  );
}
