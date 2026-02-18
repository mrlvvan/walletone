export default function IconArrowUp({ size = 12, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 4/3} fill="none" viewBox="0 0 12 16" preserveAspectRatio="xMidYMid meet" className={className} {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M5.558 2.058a.625.625 0 0 1 .884 0l3.5 3.5-.884.884-2.433-2.433V11h-1.25V4.009L2.942 6.442l-.884-.884z" clipRule="evenodd" />
    </svg>
  );
}
