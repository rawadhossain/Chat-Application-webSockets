import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'primary' &&
          'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
        variant === 'secondary' &&
          'bg-black-600 text-white hover:bg-black-700 active:bg-black-800',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};