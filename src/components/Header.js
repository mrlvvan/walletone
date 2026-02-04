function Header({ screen, selectedAsset, onBack }) {
  return (
    <header className="topbar">
      {screen === 'asset' ? (
        <>
          <button className="back-button" type="button" onClick={onBack}>
            ← Back
          </button>
          <div className="topbar-title">{selectedAsset.name}</div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="More">
              ⋯
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="topbar-left">
            <div className="avatar" />
            <div className="topbar-title">
              Кошелек <span className="verified-dot" />
            </div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="More">
              ⋯
            </button>
            <button className="icon-button" type="button" aria-label="Close">
              ×
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
