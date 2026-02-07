import React from 'react';

/** Иконка USDT (кошелёк, 36px по умолчанию) */
export function IconUsdt({ size = 36, className, ...props }) {
  return (
    <span className={className} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" fill="none" {...props}>
        <circle cx="18" cy="18" r="18" fill="#26a17a" />
        <path fill="#fff" fillRule="evenodd" d="M18 8v3.2h6.6v2.4H18v12h-3.6v-12H7.8v-2.4h6.6V8H18z" clipRule="evenodd" />
      </svg>
    </span>
  );
}
