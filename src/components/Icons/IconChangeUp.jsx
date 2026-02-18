export default function IconChangeUp({ size = 12, className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 18/12} fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true" {...props}>
      <path fill="currentColor" d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z" />
    </svg>
  );
}
