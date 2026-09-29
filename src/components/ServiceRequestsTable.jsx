import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { serviceRequests } from "../data/mockData";

function ServiceRequestsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

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

  const filteredRequests = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    const filtered = serviceRequests.filter((request) => {
      const matchesSearch =
        request.customer.toLowerCase().includes(search) ||
        request.service.toLowerCase().includes(search) ||
        request.request.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === "newest") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });
  }, [searchTerm, statusFilter, sortOrder]);

  return (
    <div className="requests-card">
      {/* Table Header */}

      <div className="table-header">
        <div>
          <h3>Recent Service Requests</h3>
          <p>Latest customer service activity</p>
        </div>
        <button className="view-all-button" type="button">
          View All
        </button>
      </div>

      {/* Filters */}

      <div className="request-filters">
        <div className="request-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="request-status-filter"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="sort-button"
          type="button"
          onClick={() =>
            setSortOrder((previous) =>
              previous === "newest" ? "oldest" : "newest",
            )
          }
        >
          <ArrowUpDown size={17} />
          {sortOrder === "newest" ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Empty State */}

      {filteredRequests.length === 0 ? (
        <div className="table-empty-state">
          <div className="empty-state-icon">
            <Search size={24} />
          </div>
          <h4>No service requests found</h4>
          <p>Try changing your search or status filter.</p>
        </div>
      ) : (
        /* Table */

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
              {filteredRequests.map((request) => (
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
      )}
    </div>
  );
}

export default ServiceRequestsTable;
