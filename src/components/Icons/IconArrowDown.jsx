export default function IconArrowDown({ size = 12, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 4/3} fill="none" viewBox="0 0 12 14" preserveAspectRatio="xMidYMid meet" className={className} {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M5.558 11.442c.244.244.64.244.884 0l3.5-3.5-.884-.884-2.433 2.433V2.5h-1.25v6.991L2.942 7.058l-.884.884z" clipRule="evenodd" />
    </svg>
  );
}
