import React from 'react';

/** Иконка Toncoin (кошелёк, 36px по умолчанию) */
export function IconTon({ size = 36, className, ...props }) {
  return (
    <span className={className} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" fill="none" {...props}>
        <circle cx="18" cy="18" r="18" fill="#0088CC" />
        <path fill="#fff" fillRule="evenodd" d="M25.58 12.23L18 21.77l-3.5-5.42 1.95-3.02h3.1l.85 1.32 2.08-1.32h2.92l-5.9 9.54 4.05 6.23h-2.94l-2.6-4.02-2.6 4.02h-2.94l4.05-6.23-5.9-9.54h2.92l2.08 1.32.85-1.32h3.1l1.95 3.02z" clipRule="evenodd" />
      </svg>
    </span>
  );
}
