function ListRow({ item }) {
  return (
    <div className="list-row">
      <div className="list-left">
        <div className={`list-icon ${item.styleClass}`}>{item.icon}</div>
        <div>
          <div className="list-title">{item.title}</div>
          <div className="list-subtitle">{item.subtitle}</div>
        </div>
      </div>
      <div className="list-value">{item.value}</div>
    </div>
  );
}

export default ListRow;
