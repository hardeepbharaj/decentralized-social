'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
  multiline?: false;
  rows?: number;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  multiline: true;
  rows?: number;
}

type InputProps = TextInputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ 
    label, 
    error, 
    className = '', 
    containerClassName = '',
    labelClassName = '',
    errorClassName = '',
    multiline = false,
    rows = 3,
    ...props 
  }, ref) => {
    const inputClassName = `block w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${className}`;

    return (
      <div className={`${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className={`block text-sm font-medium text-gray-400 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="mt-1">
          {multiline ? (
            <textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              rows={rows}
              className={inputClassName}
              {...(props as TextareaProps)}
            />
          ) : (
            <input
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              className={inputClassName}
              {...(props as TextInputProps)}
            />
          )}
        </div>
        {error && (
          <p className={`mt-1 text-sm text-red-500 ${errorClassName}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
); 