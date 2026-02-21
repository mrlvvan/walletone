import React from 'react';

/** Bitcoin (рынок, 42px) */
export function IconBtc({ size = 42, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <path fill="#F7931A" d="M39.397 24.838c-2.671 10.715-13.523 17.235-24.239 14.563C4.448 36.731-2.073 25.877.6 15.164 3.269 4.448 14.121-2.073 24.833.598c10.715 2.672 17.235 13.525 14.564 24.24" />
      <path fill="#fff" d="M28.817 17.155c.398-2.661-1.628-4.092-4.4-5.046l.9-3.606-2.195-.546-.875 3.51c-.577-.144-1.17-.28-1.759-.414l.882-3.533-2.193-.547-.9 3.604a73 73 0 0 1-1.401-.33l.002-.01-3.026-.757-.584 2.344s1.628.374 1.594.397c.889.221 1.05.81 1.023 1.276l-1.024 4.107c.061.016.14.038.228.074l-.232-.058-1.435 5.754c-.109.27-.385.675-1.006.521.022.032-1.595-.398-1.595-.398l-1.09 2.512 2.857.712c.53.134 1.051.273 1.564.404l-.908 3.647 2.192.547.9-3.608q.896.242 1.749.454l-.897 3.59 2.195.547.908-3.64c3.742.709 6.556.423 7.74-2.962.955-2.725-.047-4.297-2.016-5.322 1.434-.33 2.515-1.274 2.803-3.222zm-5.015 7.032c-.678 2.725-5.266 1.252-6.754.882l1.205-4.83c1.488.37 6.258 1.106 5.55 3.948m.68-7.071c-.62 2.479-4.439 1.22-5.677.91l1.092-4.381c1.239.309 5.229.885 4.584 3.47" />
    </svg>
  );
}

/** Ethereum (42px) */
export function IconEth({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <g clipPath={`url(#ETH_${id})`}>
        <path fill="#627EEA" fillRule="evenodd" d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48" clipRule="evenodd" />
        <path fill="#fff" d="M27.692 48.462 48 14.769l20.308 33.693-20.308 12z" />
        <path fill="#fff" d="M68.308 52.615 48 80.77 27.692 52.615l20.308 12z" />
        <path fill="#C1CCF7" d="m48 14.77 20.308 33.692L48 39.38z" />
        <path fill="#8198EE" d="M48 39.38v21.082l20.308-12z" />
        <path fill="#C1CCF7" d="m48 60.462-20.308-12L48 39.38z" />
        <path fill="#fff" d="m27.692 52.615 20.308 12V80.77z" />
        <path fill="#C1CCF7" d="M68.308 52.615 48 80.77V64.615z" />
      </g>
      <defs>
        <clipPath id={`ETH_${id}`}>
          <path fill="#fff" d="M0 0h96v96H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** XRP (42px) */
export function IconXrp({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <g clipPath={`url(#XRP_${id})`}>
        <path fill="#23292F" d="M48 96a48 48 0 0 0 44.346-29.631 47.995 47.995 0 0 0-10.405-52.31A48 48 0 1 0 48 96" />
        <path fill="#fff" d="M65.563 27.557h7.217L57.771 42.531a13.91 13.91 0 0 1-19.662 0L23.143 27.557h7.208l11.4 11.374a8.81 8.81 0 0 0 12.455 0zM30.317 69.206h-7.174l15.06-15.069a13.91 13.91 0 0 1 19.663 0L72.96 69.206h-7.209L54.266 57.737a8.81 8.81 0 0 0-12.455 0z" />
      </g>
      <defs>
        <clipPath id={`XRP_${id}`}>
          <rect width="96" height="96" fill="#fff" rx="48" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Solana (42px) */
export function IconSol({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={size} height={size} fill="none" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <linearGradient id={`SOL_a_${id}`}><stop offset="0" stopColor="#00ffa3" /><stop offset="1" stopColor="#dc1fff" /></linearGradient>
      <linearGradient xlinkHref={`#SOL_a_${id}`} id={`SOL_b_${id}`} x1="71.465" x2="39.653" y1="20.975" y2="81.907" gradientUnits="userSpaceOnUse" />
      <linearGradient xlinkHref={`#SOL_a_${id}`} id={`SOL_c_${id}`} x1="57.555" x2="25.743" y1="13.714" y2="74.646" gradientUnits="userSpaceOnUse" />
      <linearGradient xlinkHref={`#SOL_a_${id}`} id={`SOL_d_${id}`} x1="64.466" x2="32.654" y1="17.321" y2="78.253" gradientUnits="userSpaceOnUse" />
      <path fill="#000" d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48" />
      <path fill={`url(#SOL_b_${id})`} d="M28.558 60.852c.348-.348.826-.55 1.332-.55h45.966c.84 0 1.26 1.013.666 1.607l-9.08 9.08c-.348.348-.826.55-1.332.55H20.143c-.84 0-1.26-1.013-.666-1.607z" />
      <path fill={`url(#SOL_c_${id})`} d="M28.558 26.95c.362-.347.84-.55 1.332-.55h45.966c.84 0 1.26 1.014.666 1.608l-9.08 9.08c-.348.347-.826.55-1.332.55H20.143c-.84 0-1.26-1.014-.666-1.608z" />
      <path fill={`url(#SOL_d_${id})`} d="M67.442 43.792a1.9 1.9 0 0 0-1.332-.55H20.143c-.84 0-1.26 1.014-.666 1.607l9.08 9.08c.348.348.826.55 1.332.55h45.966c.84 0 1.26-1.013.666-1.607z" />
    </svg>
  );
}

/** TRON (42px) */
export function IconTrx({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <g clipPath={`url(#TRX_${id})`}>
        <circle cx="20" cy="20" r="20" fill="#FF060A" />
        <path fill="#fff" d="M31.5 16.23c-1.125-1.038-2.681-2.625-3.949-3.75l-.075-.052a1.4 1.4 0 0 0-.416-.233C24.004 11.625 9.78 8.967 9.503 9a.5.5 0 0 0-.218.083l-.071.056a.8.8 0 0 0-.195.315L9 9.503v.307c1.601 4.46 7.924 19.065 9.169 22.493.075.232.217.675.483.697h.06c.143 0 .75-.802.75-.802s10.86-13.17 11.96-14.573a3.5 3.5 0 0 0 .374-.555.9.9 0 0 0-.296-.84m-9.251 1.534 4.635-3.844 2.718 2.505-7.353 1.34zm-1.8-.251-7.98-6.54 12.911 2.381zm.72 1.714 8.167-1.317L20 29.16l1.17-9.933zm-9.784-7.602 8.396 7.125-1.215 10.418z" />
      </g>
      <defs>
        <clipPath id={`TRX_${id}`}>
          <rect width="40" height="40" fill="#fff" rx="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Dogecoin (42px) */
export function IconDoge({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <clipPath id={`DOGE_${id}`}><path d="M0 0h96v96H0z" /></clipPath>
      <g clipPath={`url(#DOGE_${id})`}>
        <path fill="#988430" d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48" />
        <path fill="#7a6a2a" d="M48 94.462c25.66 0 46.462-20.802 46.462-46.462S73.66 1.537 48 1.537 1.537 22.34 1.537 48 22.34 94.462 48 94.462" />
        <path fill="#ba9f33" d="M48 93.484c25.12 0 45.483-20.364 45.483-45.484S73.12 2.517 48 2.517 2.516 22.88 2.516 48 22.88 93.484 48 93.484" />
        <g fillRule="evenodd" clipRule="evenodd">
          <path fill="#cfb66c" d="M20.987 42.874c-.272-.249-.56-.498-.824-.746a77 77 0 0 0-.807-.745l-.808-.768c-.132-.132-.272-.249-.404-.381-.132-.116-.287-.248-.42-.365-1.072-1.018-2.15-2.035-3.207-3.053a605 605 0 0 1 3.262 3.014l.38.38c.133.132.273.25.405.381l.807.746c.272.248.536.497.808.768.272.27.536.52.808.768m-14.23-.154s3.9.404 5.803.675c1.762.25 7.277 1.095 7.277 1.095zm0 0c1.096.093 2.19.21 3.286.326.56.054 1.095.116 1.631.17l.823.094.808.117 3.262.52 1.631.272c.536.093 1.072.194 1.631.287a39 39 0 0 1-1.63-.21l-1.632-.233-3.262-.48c-.272-.04-.536-.094-.808-.133l-.823-.095c-.536-.054-1.095-.132-1.631-.194a95 95 0 0 1-3.286-.443zm12.692 2.786s-4.163 1.057-5.57 1.461c-1.381.38-5.568 1.654-5.568 1.654z" />
          <path fill="#cfb66c" d="M19.449 45.506c-.925.272-1.844.536-2.781.785l-2.78.746c-.925.272-1.844.536-2.766.808l-1.382.38c-.458.132-.924.248-1.398.381.458-.154.924-.31 1.383-.443l1.382-.442c.924-.288 1.843-.56 2.765-.847.94-.233 1.864-.482 2.803-.707.893-.225 1.834-.45 2.773-.66M8.894 51.185c.457-.172 5.74-2.633 6.966-3.208.615-.288 2.4-.922 2.4-.922z" />
          <path fill="#cfb66c" d="M8.894 51.185c.403-.154.784-.342 1.172-.52l1.15-.536 2.307-1.111c.768-.365 1.514-.768 2.306-1.111.404-.17.808-.31 1.212-.442l.614-.194c.21-.055.404-.117.614-.172-.768.366-1.576.676-2.345 1.033-.768.381-1.554.692-2.346 1.033l-2.346 1.033c-.787.32-1.555.66-2.339.987m.512 2.15s4.784-2.804 6.43-3.705c.862-.481 3.65-1.864 3.65-1.864z" />
          <path fill="#cfb66c" d="M9.406 53.336c.807-.497 1.63-1.002 2.454-1.514l1.229-.746c.42-.248.823-.481 1.25-.73.42-.248.824-.497 1.251-.73q.305-.188.637-.326l.652-.326c.862-.42 1.725-.847 2.633-1.212-.823.52-1.67.964-2.516 1.421-.42.233-.847.443-1.266.676s-.824.482-1.251.707a29 29 0 0 1-1.25.707l-1.266.691-2.556 1.382m10.042-4.955s-2.974 2.283-3.937 3.013a351 351 0 0 1-3.798 2.781z" />
          <path fill="#e2cc85" d="m36.52 66.796-1.522-2.882.885-3.604 6.315-2.438-2.688-5.515 1.329-5.569 2.493-4.987 7.705-1.211 5.662-5.398 12.225.924 2.4 13.072-4.621 16.458-2.633 8.521-10.672.404-4.955-3.433-5.802-2.424z" />
          <path fill="#f1d789" d="M55.239 66.703s-1.476.676-3.994.52c-.728-.978-5.83-1.436-5.83-1.436s-.638-.194-1.764.272c-1.134.46-2.206.404-3.208.652s-1.997-1.056-2.765-1.328c-.768-.287-1.786-.979-1.786-.979l-2.15-.21-4.319-1.825-6.86-6.835-1.864 2.919-.575 3.611 2.074 4.28 5.584 5.088 10.89 2.764 6.454-1.901 8.085-3.418z" />
          <path fill="#fff" fillOpacity="0.8" d="M74.4 36.194C69.546 23.66 57.546 21.336 57.546 21.336H23.309l.132 12.769h6.818v28.513h-6.95v12.745h33.289c8.023 0 14.454-8.062 14.454-8.062 10.3-14.617 3.348-31.107 3.348-31.107M56.777 58.711s-2.611 3.767-5.453 3.767h-5.683l-.134-28.342H52.8s3.38.707 5.74 7.394c0 0 3.13 9.574-1.763 17.18" />
        </g>
      </g>
    </svg>
  );
}

/** CATI (42px) */
export function IconCati({ size = 42, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={size} height={size} fill="none" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <image xlinkHref="data:image/webp;base64,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" width="100%" height="100%" clipPath="inset(0% round 50%)" />
    </svg>
  );
}

/** Chainlink (42px) */
export function IconLink({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <g clipPath={`url(#LINK_${id})`}>
        <path fill="#2A5ADA" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20" />
        <path fill="#fff" d="m20 7.5-2.328 1.319-6.344 3.612L9 13.75v12.5l2.328 1.319 6.402 3.612 2.328 1.319 2.328-1.319 6.286-3.612L31 26.25v-12.5l-2.328-1.319-6.344-3.612zm-6.344 16.113v-7.226L20 12.775l6.344 3.612v7.226L20 27.224l-6.344-3.613z" />
      </g>
      <defs>
        <clipPath id={`LINK_${id}`}>
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Aptos (42px) — логотип: image + векторный fallback (WebP может не грузиться в WebView) */
const APT_LOGO_BASE64 = 'data:image/webp;base64,UklGRtIDAABXRUJQVlA4TMYDAAAvX8AXAAUlWtsMSVN8X1RV+7dt28wa27ZtL23btm2jXZXxvotWRmSOZxHR/wkw/ycsIkbEiEhGiVZUd+/Vs1t1hWaNiGrdxBUPv/qWh1985+3nHrjhygOXjK40KpIRIr2XPf3JRodSDJKEi+F+eeiohTXZoLlph74CB5Jg+wBBsPz07qMKRiRldsa538IxYfCjI0aqSbPYwcd9Q4Ie8cHe3SVFduM3y6Bn1/r4IkmJSM8zGsAA3U8HVImmwY58uuRcCIhbr+gj4YlOf4f+AThHEs/2VxuazviC/vHdFjMuKpOke2uICVt02hf0DvfjEjHV55Riknyjj2pIdsQ7IEiCJEiCJEiCJEgCxC+rWGO0+y0lkCg/1cuEXPdQfYBfr6em7YA7fv29vr7+99PzIfVcWmw/iopRVGw/iopRVGw/ioqjrbSjdfOjKCoWlxRC+ttXbP+CZJn0uPybB4dKdmnV+TFwZ51IVhUObQURX1aVDtFq37XDTi2DJHF+n+oEq6w3UyzFnuFix3YcnIu7/PV48WXPBEgCJEGCJEASJEgCINAOQZIgQRIgCdJtaHzXPgGmGtdaXxOb6BvxT61Acnyhh68VnLemw2dt9JmP1km+DveF+OCCyLo/uuQQiR+9Cp7cyRVqTG6735EU3G4iXnK3OC9oPLnGtC3s+0NSxMXWj+0/YrjPEcMqcu1IbuDwxPupn791bc/ummn5PX/+Yp18hulm9c59s6xkll39uxh0n0+3qasaOSLJkRP2+JIggVdXHeF7eN7XzM8S/fy7kgPbovEz328M8zX6FzBB0Dm2B3rGE7W+qh5KJGRcZH3pcUwUgEMYXF18yeJyErhm+krvxWF8PMybqXsGXXK8rVJ1+pdAAO7SnDeRveMu4b4KK0ajbwNA87JqvMvIdxu6WP9gdxVjxGzwRYP/hyqNeDO5CTNndHrm1LwV01YGzpzhfbCYFIoR054Y/5KKLBdRFc20GTdcP1+yS2XEi8BbU2x29b7PEfHzwzPK2jH3OZDkg4MlzFxouUt/Akgyjr996qmnA9xPQ9Ohr8cMGDd2D0/6Po1w3AWVIqEZo70uanUuBOcaD6pSk0I1hZ2/Rgjld9fIiaTBGCMz725xvtyv540Qk15bte1rMYHEgNKjK+U1TUZ00C6vlF1SccsjG9SqSbmq6bXOXT8SBNABSJD85IrlKlVT11YLEza94dUSyg5tgBgNz1665nArJitFJdd78rL7XHbNTbfecuM1F+6waHw3ERWTsaJi84VCTkXFZLKYdsX8zzA=';

export function IconApt({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={size} height={size} fill="none" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <defs>
        <linearGradient id={`APT_fallback_${id}`} x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0052FF" />
          <stop offset="1" stopColor="#00D4AA" />
        </linearGradient>
        <clipPath id={`APT_clip_${id}`}>
          <circle cx="48" cy="48" r="48" />
        </clipPath>
      </defs>
      <g clipPath={`url(#APT_clip_${id})`}>
        <circle cx="48" cy="48" r="48" fill={`url(#APT_fallback_${id})`} />
        <image xlinkHref={APT_LOGO_BASE64} x="0" y="0" width="96" height="96" preserveAspectRatio="xMidYMid slice" />
      </g>
    </svg>
  );
}

/** Bitcoin Cash (42px) */
export function IconBch({ size = 42, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 2500 2500" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <g clipPath={`url(#BCH_${id})`}>
        <path fill="#8CC451" d="M1250 2500c690.36 0 1250-559.64 1250-1250C2500 559.644 1940.36 0 1250 0 559.644 0 0 559.644 0 1250c0 690.36 559.644 1250 1250 1250" />
        <path fill="#fff" d="M1640.3 831.7c-62.7-142.5-206.7-172-383.2-143L1200.3 469l-133.9 34.6 55.7 219.2c-35.1 9-71.2 16.5-106.8 26.6l-56.2-217.7-133.9 34.6L881.8 786c-28.6 8-269.4 70.2-269.4 70.2l37.1 143s98.3-27.6 97.3-25.1c54.2-14 79.8 13 92.3 38.6l155.5 601.9c2 17.6-1 47.7-38.6 57.2 2 1-97.3 25.1-97.3 25.1l14.6 166.5s238.3-61.2 269.9-68.7l57.7 222.2 133.4-34.6-57.2-223.7c37.1-8.5 72.2-17.6 107.3-26.6l57.2 222.7 133.9-34.6-57.2-221.7c205.7-50.2 351.1-179.6 321-378.2-19.1-119.4-149.5-217.7-258.3-228.7 66.3-60.2 100.4-147 59.3-259.8m-64.7 523.6c26.6 196.6-246.3 220.7-337.1 244.3l-78.8-293.9c91.3-24.1 371.2-123.9 415.9 49.6M1411 955.1c28.1 174.6-205.2 195.1-280.9 214.7L1058.9 903c75.7-19.7 294.9-109.5 352.1 52.1" />
      </g>
      <defs>
        <clipPath id={`BCH_${id}`}>
          <path fill="#fff" d="M0 0h2500v2500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
