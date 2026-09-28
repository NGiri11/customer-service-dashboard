function SummaryCard({ title, value, icon, description, trend }) {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <div className="summary-icon">{icon}</div>
        <span className="summary-trend">{trend}</span>
      </div>

      <div className="summary-content">
        <p>{title}</p>
        <h2>{value}</h2>
        <span className="summary-description">{description}</span>
      </div>
    </div>
  );
}

export default SummaryCard;
