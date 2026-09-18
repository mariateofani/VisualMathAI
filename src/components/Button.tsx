import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
