import React from 'react';

export default function IconProductFunds({ size = 40, className, ...props }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className={className} {...props}>
      <path fill={`url(#product_funds_p0_${id})`} d="m30.338 10.817-9.194 9.193-9.195-9.195a12.96 12.96 0 0 1 9.193-3.81 12.96 12.96 0 0 1 9.196 3.812" />
      <path fill={`url(#product_funds_p1_${id})`} d="M21.142 6.605a13.36 13.36 0 0 1 9.479 3.93.4.4 0 0 1 0 .565l-9.193 9.193a.4.4 0 0 1-.567 0l-9.195-9.195a.4.4 0 0 1 0-.566 13.36 13.36 0 0 1 9.476-3.927m0 .801a12.55 12.55 0 0 0-8.62 3.415l8.622 8.623 8.621-8.62a12.55 12.55 0 0 0-8.623-3.418" />
      <path fill="#FFCFF0" d="M21.142 6.605a.4.4 0 0 1 0 .801c-3.48 0-6.63 1.41-8.91 3.692a.401.401 0 0 1-.566-.566 13.36 13.36 0 0 1 9.476-3.927" />
      <path fill={`url(#product_funds_p2_${id})`} d="m30.338 10.818-9.194 9.194 9.19 9.189a12.96 12.96 0 0 0 3.808-9.194c0-3.588-1.454-6.836-3.804-9.189" />
      <path fill={`url(#product_funds_p3_${id})`} d="M33.742 20.008c0-3.334-1.297-6.363-3.411-8.617l-8.621 8.62 8.616 8.617a12.55 12.55 0 0 0 3.416-8.62m.8 0c0 3.7-1.501 7.05-3.926 9.475a.4.4 0 0 1-.566 0l-9.189-9.188a.4.4 0 0 1 0-.567l9.193-9.193c.17-.137.402-.165.567 0a13.36 13.36 0 0 1 3.92 9.473" />
      <path fill={`url(#product_funds_p4_${id})`} d="M8.14 20.006c0 7.18 5.82 13 13 13a12.96 12.96 0 0 0 9.191-3.807l-9.189-9.189z" />
      <path fill={`url(#product_funds_p5_${id})`} d="M21.142 19.61a.44.44 0 0 1 .283.117l9.189 9.189c.15.15.15.416 0 .566a13.36 13.36 0 0 1-9.474 3.923c-7.4 0-13.4-5.999-13.4-13.4 0-.211.188-.4.4-.4zm-12.595.796c.211 6.774 5.769 12.2 12.593 12.2a12.55 12.55 0 0 0 8.619-3.414l-8.784-8.783z" />
      <path fill="#003D7A" d="M8.928 24.486a.4.4 0 0 1 .521.222c1.864 4.63 6.398 7.898 11.693 7.898a.4.4 0 0 1 0 .8c-5.633 0-10.454-3.477-12.435-8.4a.4.4 0 0 1 .221-.52" />
      <path fill="#fff" d="M22.349 8.862a.4.4 0 0 0 .349.445 10.31 10.31 0 0 1 8.719 7.57.4.4 0 1 0 .772-.207c-1.209-4.512-5.027-7.626-9.395-8.157a.4.4 0 0 0-.445.349" opacity="0.5" />
      <path fill="#105EAC" d="M19.983 31.07a.4.4 0 0 0-.349-.446 10.315 10.315 0 0 1-8.72-7.57.4.4 0 1 0-.772.208c1.21 4.511 5.028 7.626 9.395 8.157a.4.4 0 0 0 .446-.35" opacity="0.5" />
      <path fill={`url(#product_funds_p6_${id})`} d="m2.14 17.777 13.002.004-9.195-9.195a12.96 12.96 0 0 0-3.807 9.191" />
      <path fill="#FFF8D8" d="M6.107 10.784a.4.4 0 0 1 .566-.016l4.486 4.244a.4.4 0 0 1-.55.58L6.124 11.35a.4.4 0 0 1-.017-.566" opacity="0.75" />
      <path fill={`url(#product_funds_p7_${id})`} d="m6.23 8.303 9.195 9.195c.246.246.066.683-.283.684L2.14 18.177a.4.4 0 0 1-.4-.4c0-3.7 1.5-7.05 3.924-9.474.168-.139.401-.164.565 0m-.277.855a12.55 12.55 0 0 0-3.406 8.219l11.628.003z" />
      <path fill="#FFBF69" d="m6.231 8.303 3.913 3.914a.4.4 0 0 1-.565.565L5.954 9.158a12.6 12.6 0 0 0-2.331 3.504.4.4 0 1 1-.73-.325 13.4 13.4 0 0 1 2.772-4.034c.17-.138.401-.165.566 0" />
      <defs>
        <linearGradient id={`product_funds_p0_${id}`} x1="21.143" x2="21.143" y1="20.01" y2="7.006" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DD2A5D" /><stop offset="0.5" stopColor="#FF749C" /><stop offset="1" stopColor="#FFB8E9" />
        </linearGradient>
        <linearGradient id={`product_funds_p1_${id}`} x1="21.143" x2="23.07" y1="19.408" y2="8.327" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D41F52" /><stop offset="1" stopColor="#FF99B6" />
        </linearGradient>
        <linearGradient id={`product_funds_p2_${id}`} x1="28.164" x2="28.126" y1="29.201" y2="10.818" gradientUnits="userSpaceOnUse">
          <stop stopColor="#764EF0" /><stop offset="0.5" stopColor="#9877FF" /><stop offset="1" stopColor="#C9B7FF" />
        </linearGradient>
        <linearGradient id={`product_funds_p3_${id}`} x1="25.28" x2="29.864" y1="23.998" y2="11.442" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5A24CD" /><stop offset="0.498" stopColor="#815FEB" /><stop offset="1" stopColor="#AE8BFF" />
        </linearGradient>
        <linearGradient id={`product_funds_p4_${id}`} x1="21.187" x2="17.798" y1="15.732" y2="30.574" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4EAFF" /><stop offset="0.504" stopColor="#60BFEF" /><stop offset="1" stopColor="#0094FE" />
        </linearGradient>
        <linearGradient id={`product_funds_p5_${id}`} x1="14.395" x2="16.614" y1="30.055" y2="15.166" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0067D8" /><stop offset="0.49" stopColor="#0098EA" /><stop offset="1" stopColor="#C6EBFF" />
        </linearGradient>
        <linearGradient id={`product_funds_p6_${id}`} x1="6.617" x2="11.567" y1="10.205" y2="20.428" gradientUnits="userSpaceOnUse">
          <stop offset="0.062" stopColor="#FCDC6F" /><stop offset="1" stopColor="#D98819" />
        </linearGradient>
        <linearGradient id={`product_funds_p7_${id}`} x1="9.522" x2="3.281" y1="17.781" y2="10.42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C27611" /><stop offset="1" stopColor="#FF9200" />
        </linearGradient>
      </defs>
    </svg>
  );
}
