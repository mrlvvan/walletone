import React from 'react';

/** Иконка поиска актива: буква в круге (удобно вызывать везде) */
export function SearchAssetIcon({ letter, bg = '#2b3142', size = 42, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 40 40" className={className} {...props}>
      <circle cx="20" cy="20" r="20" fill={bg} />
      <text x="20" y="25" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="600">{letter}</text>
    </svg>
  );
}
