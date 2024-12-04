import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        'w-full px-4 py-2 rounded-lg bg-black-600 text-white placeholder-black-300 border border-black-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors',
        className
      )}
      {...props}
    />
  );
};