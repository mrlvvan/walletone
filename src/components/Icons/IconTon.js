import React from 'react';

/** Иконка Toncoin (кошелёк, 36px по умолчанию) */
export function IconTon({ size = 36, className, ...props }) {
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
      <circle cx="18" cy="18" r="18" fill="#0098EA" />
      <path
        fill="#fff"
        d="M26.948 11.25c.64 0 1.096.614.896 1.23l-9.02 13.94a1.08 1.08 0 0 1-1.824 0l-9.02-13.94c-.2-.616.255-1.23.896-1.23h18.072zm-8.948 12.394 6.327-9.754H11.673l6.327 9.754z"
      />
    </svg>
  );
}
