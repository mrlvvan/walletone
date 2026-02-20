import './WalletActions.css';

function WalletActions({ onTransfer }) {
  const actions = [
    {
      id: 'send',
      label: 'Перевести',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="currentColor"
            d="M3.012 13.733q8.86-3.86 11.813-5.09c5.629-2.34 6.797-2.746 7.56-2.76.167-.002.54.04.784.237.203.166.26.39.289.548.025.158.06.517.031.797-.303 3.204-1.623 10.977-2.295 14.566-.281 1.518-.842 2.027-1.383 2.076-1.177.109-2.07-.777-3.21-1.524-1.782-1.169-2.788-1.896-4.52-3.037-2-1.318-.703-2.042.437-3.226.297-.31 5.482-5.025 5.58-5.453.013-.053.026-.253-.094-.358-.117-.105-.292-.069-.418-.04-.18.04-3.026 1.923-8.547 5.648q-1.21.832-2.197.811c-.721-.015-2.114-.409-3.15-.745-1.265-.412-2.275-.63-2.187-1.331q.068-.547 1.507-1.12Z"
          />
        </svg>
      ),
    },
    {
      id: 'add',
      label: 'Пополнить',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3 14C3 7.925 7.925 3 14 3s11 4.925 11 11-4.925 11-11 11S3 20.075 3 14m11-5.75a.75.75 0 0 1 .75.75v4.25H19a.75.75 0 0 1 0 1.5h-4.25V19a.75.75 0 0 1-1.5 0v-4.25H9a.75.75 0 0 1 0-1.5h4.25V9a.75.75 0 0 1 .75-.75"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 'withdraw',
      label: 'Вывести',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M14 3C7.925 3 3 7.925 3 14s4.925 11 11 11 11-4.925 11-11S20.075 3 14 3m4.53 9.47-4-4a.75.75 0 0 0-1.06 0l-4 4a.75.75 0 1 0 1.06 1.06l2.72-2.72V19a.75.75 0 0 0 1.5 0v-8.19l2.72 2.72a.75.75 0 1 0 1.06-1.06"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 'swap',
      label: 'Обменять',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="29"
          fill="none"
          viewBox="0 0 28 29"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3 14.5c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11m9.304-5.97c.26.26.26.68 0 .94l-1.365 1.365h7.394a.665.665 0 1 1 0 1.33H10.94l1.364 1.365a.665.665 0 1 1-.94.94l-2.5-2.5a.665.665 0 0 1 0-.94l2.5-2.5c.26-.26.68-.26.94 0m3.556 6.94a.665.665 0 1 1 .94-.94l2.5 2.5a.665.665 0 0 1 0 .94l-2.5 2.5a.665.665 0 1 1-.94-.94l1.365-1.365H9.83a.665.665 0 1 1 0-1.33h7.395z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="wallet-actions actions-section">
      {actions.map((action) => (
        <button
          className="action-item"
          type="button"
          key={action.id}
          onClick={action.id === 'send' ? onTransfer : undefined}
        >
          <span className="action-icon">{action.icon}</span>
          <span className="action-label">{action.label}</span>
        </button>
      ))}
    </section>
  );
}

export default WalletActions;
