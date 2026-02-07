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
        <path fill="#fff" fillOpacity="0.8" d="M74.4 36.194C69.546 23.66 57.546 21.336 57.546 21.336H23.309l.132 12.769h6.818v28.513h-6.95v12.745h33.289c8.023 0 14.454-8.062 14.454-8.062 10.3-14.617 3.348-31.107 3.348-31.107M56.777 58.711s-2.611 3.767-5.453 3.767h-5.683l-.134-28.342H52.8s3.38.707 5.74 7.394c0 0 3.13 9.574-1.763 17.18" />
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
