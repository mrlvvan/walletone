import './ActivityList.css';

function ActivityList({ activity }) {
  return (
    <div className="activity-list">
      {activity.map((item) => (
        <div className="activity-row" key={item.id}>
          <div className="activity-left">
            <span className={`activity-dot ${item.tone}`} />
            <div>
              <div className="activity-title">{item.title}</div>
              <div className="activity-time">{item.time}</div>
            </div>
          </div>
          <div className={`activity-value ${item.tone}`}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default ActivityList;
