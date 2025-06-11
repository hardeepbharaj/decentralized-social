import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isRounded?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'sm',
  isRounded = true,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-500',
    secondary: 'border border-gray-800 bg-black text-gray-100 shadow-sm hover:bg-gray-900',
    ghost: 'text-gray-400 hover:text-gray-300',
  };

  const sizes = {
    sm: 'px-3 h-9 text-xs',
    md: 'px-3 h-10 text-sm',
    lg: 'px-3 h-11 text-base',
  };

  const rounded = isRounded ? 'rounded-full' : 'rounded-lg';
  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        rounded,
        width,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
} 