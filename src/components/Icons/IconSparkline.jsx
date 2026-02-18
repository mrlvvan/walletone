export default function IconSparkline({ d, up = true, size = 80, className, ...props }) {
  return (
    <svg width={size} height={size * 42/80} viewBox="0 0 80 42" preserveAspectRatio="none" className={className} {...props}>
      <path fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor" d={d} />
    </svg>
  );
}
