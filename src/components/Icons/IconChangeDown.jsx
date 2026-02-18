export default function IconChangeDown({ size = 12, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 18/12} fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true" {...props}>
      <path fill="currentColor" d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263" />
    </svg>
  );
}
