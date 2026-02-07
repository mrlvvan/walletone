import React from 'react';

/** Иконка USDT (кошелёк, 36px по умолчанию) */
export function IconUsdt({ size = 36, className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="18" cy="18" r="18" fill="#26a17a" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M19.5 15.2v-2.3h5.7v-3.1H10.8v3.1h5.7v2.3c-4.6.2-8 1-8 1.9 0 .9 3.4 1.7 8 1.9v7.4h3v-7.4c4.6-.2 8-1 8-1.9 0-.9-3.4-1.7-8-1.9zm0 3.3v.1c-.1 0-.6.1-1.5.1s-1.4-.1-1.5-.1v-.1c-3-.1-5.2-.5-5.2-1 0-.5 2.2-.9 5.2-1v1.6c.4 0 1 .1 1.5.1s1.1 0 1.5-.1v-1.6c3 .1 5.2.5 5.2 1 0 .5-2.2.9-5.2 1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
