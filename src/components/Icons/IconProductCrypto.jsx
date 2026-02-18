import React from 'react';

export default function IconProductCrypto({ size = 40, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <path fill={`url(#product_crypto_a_${id})`} stroke={`url(#product_crypto_b_${id})`} strokeLinejoin="round" strokeWidth="0.8" d="M18.234 34.241c6.55 0 11.861-2.525 11.861-5.64v-3.165H6.372V28.6c0 3.116 5.311 5.641 11.862 5.641Z" />
      <ellipse cx="18.234" cy="25.436" fill={`url(#product_crypto_c_${id})`} stroke={`url(#product_crypto_d_${id})`} strokeWidth="0.8" rx="11.861" ry="5.641" />
      <path fill={`url(#product_crypto_e_${id})`} stroke={`url(#product_crypto_f_${id})`} strokeLinejoin="round" strokeWidth="0.8" d="M18.234 31.078c6.55 0 11.861-2.526 11.861-5.641v-3.164H6.372v3.164c0 3.115 5.311 5.64 11.862 5.64Z" />
      <path stroke="#803222" strokeLinecap="round" strokeWidth="0.8" d="M6.372 25.436c0 2.307 2.911 4.29 7.08 5.165" />
      <ellipse cx="18.234" cy="22.356" fill={`url(#product_crypto_g_${id})`} stroke={`url(#product_crypto_h_${id})`} strokeWidth="0.8" rx="11.861" ry="5.641" />
      <path stroke="#FFAE00" strokeLinecap="round" strokeWidth="0.8" d="M6.372 22.356c0 3.116 5.311 5.641 11.862 5.641 3.077 0 5.881-.557 7.99-1.471" />
      <path stroke="#FFE4AA" strokeLinecap="round" strokeWidth="0.8" d="M18.234 27.997c-3.634 0-6.887-.777-9.063-2.001" />
      <ellipse cx="20.285" cy="20.771" fill={`url(#product_crypto_i_${id})`} opacity="0.6" rx="9.809" ry="4.665" />
      <path fill={`url(#product_crypto_j_${id})`} stroke={`url(#product_crypto_k_${id})`} strokeLinejoin="round" strokeWidth="0.8" d="M20.545 20.982c6.328 1.695 12.11.63 12.917-2.38l.82-3.055-22.915-6.14-.82 3.056c-.806 3.01 3.67 6.823 9.998 8.519Z" />
      <ellipse cx="22.825" cy="12.477" fill={`url(#product_crypto_l_${id})`} stroke={`url(#product_crypto_m_${id})`} strokeWidth="0.8" rx="11.861" ry="5.641" transform="rotate(15 22.825 12.477)" />
      <path stroke="#FFAE00" strokeLinecap="round" strokeWidth="0.8" d="M11.367 9.407c-.807 3.009 3.67 6.823 9.997 8.518 2.973.797 5.825.984 8.098.647" />
      <path stroke="#FFF8D8" strokeLinecap="round" strokeWidth="0.8" d="M13.16 9.488c-.81 1.144.582 3.644 5.6 5.911m3.444 1.191c.666.225 2.622.63 4.782.675" opacity="0.75" />
      <path stroke="#803222" strokeLinecap="round" strokeWidth="0.6" d="M18.234 34.2c-6.551 0-11.862-2.526-11.862-5.642" />
      <defs>
        <linearGradient id={`product_crypto_a_${id}`} x1="30.401" x2="6.493" y1="26.578" y2="26.524" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9C23A" /><stop offset="0.266" stopColor="#FCDC6F" /><stop offset="1" stopColor="#D98819" />
        </linearGradient>
        <linearGradient id={`product_crypto_b_${id}`} x1="12.959" x2="18.234" y1="30.38" y2="34.241" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B4736" /><stop offset="1" stopColor="#D28256" />
        </linearGradient>
        <linearGradient id={`product_crypto_d_${id}`} x1="18.234" x2="18.234" y1="19.795" y2="31.077" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C07512" /><stop offset="1" stopColor="#ED8A05" />
        </linearGradient>
        <linearGradient id={`product_crypto_e_${id}`} x1="30.401" x2="6.493" y1="23.415" y2="23.361" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9C23A" /><stop offset="0.266" stopColor="#FCDC6F" /><stop offset="1" stopColor="#D98819" />
        </linearGradient>
        <linearGradient id={`product_crypto_f_${id}`} x1="12.959" x2="18.234" y1="27.217" y2="31.078" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B4736" /><stop offset="1" stopColor="#D28256" />
        </linearGradient>
        <linearGradient id={`product_crypto_g_${id}`} x1="11.9" x2="15.145" y1="26.956" y2="18.049" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCDC6F" /><stop offset="0.356" stopColor="#F9C23A" /><stop offset="1" stopColor="#D98819" />
        </linearGradient>
        <linearGradient id={`product_crypto_h_${id}`} x1="15.777" x2="13.125" y1="17.866" y2="26.726" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B06400" /><stop offset="0.255" stopColor="#C27611" /><stop offset="1" stopColor="#FF9200" />
        </linearGradient>
        <linearGradient id={`product_crypto_i_${id}`} x1="21.68" x2="20.285" y1="20.211" y2="25.437" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A3503B" /><stop offset="1" stopColor="#A3503B" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`product_crypto_j_${id}`} x1="34.281" x2="11.201" y1="16.729" y2="10.489" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9C23A" /><stop offset="0.266" stopColor="#FCDC6F" /><stop offset="1" stopColor="#D98819" />
        </linearGradient>
        <linearGradient id={`product_crypto_k_${id}`} x1="17.553" x2="20.545" y1="14.448" y2="20.982" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B4736" /><stop offset="1" stopColor="#D28256" />
        </linearGradient>
        <linearGradient id={`product_crypto_l_${id}`} x1="16.491" x2="30.73" y1="17.076" y2="7.131" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCDC6F" /><stop offset="0.356" stopColor="#F9C23A" /><stop offset="1" stopColor="#D98819" />
        </linearGradient>
        <linearGradient id={`product_crypto_m_${id}`} x1="18.604" x2="17.716" y1="9.402" y2="16.846" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C27611" /><stop offset="1" stopColor="#FF9200" />
        </linearGradient>
        <radialGradient id={`product_crypto_c_${id}`} cx="0" cy="0" r="1" gradientTransform="matrix(12.13516 -18.82502 39.49579 25.46013 12.033 29.85)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE27B" /><stop offset="0.272" stopColor="#EAB222" /><stop offset="0.484" stopColor="#EEAE0D" /><stop offset="0.656" stopColor="#FFD66C" /><stop offset="0.818" stopColor="#EEAE0D" /><stop offset="1" stopColor="#F90" />
        </radialGradient>
      </defs>
    </svg>
  );
}
