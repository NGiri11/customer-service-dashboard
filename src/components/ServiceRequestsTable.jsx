import { serviceRequests } from "../data/mockData";

function ServiceRequestsTable() {
  const getStatusClass = (status) => {
    switch (status) {
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

  return (
    <div className="requests-card">
      <div className="table-header">
        <div>
          <h3>Recent Service Requests</h3>
          <p>Latest customer service activity</p>
        </div>
        <button className="view-all-button">View All</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Request</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request.id}>
                <td>
                  <div className="customer-cell">
                    <div className="customer-avatar">
                      {request.customer.charAt(0)}
                    </div>
                    <span>{request.customer}</span>
                  </div>
                </td>
                <td>{request.service}</td>
                <td>{request.request}</td>
                <td>
                  <span className={getStatusClass(request.status)}>
                    {request.status}
                  </span>
                </td>
                <td>{request.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceRequestsTable;
