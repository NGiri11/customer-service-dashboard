function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case "Active":
        return "customer-status active";

      case "Inactive":
        return "customer-status inactive";

      case "Completed":
        return "status completed";

      case "Pending":
        return "status pending";

      case "In Progress":
        return "status progress";

      default:
        return "status";
    }
  };

  return <span className={getStatusClass()}>{status}</span>;
}

export default StatusBadge;
