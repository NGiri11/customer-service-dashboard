import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Briefcase,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Customers({ customers, setCustomers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Basic Support",
    status: "Active",
  });

  /*
   * Filter customers according to search
   * and selected status.
   */
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  /*
   * Handle new customer form fields.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Add customer to the local state.
   */
  const handleAddCustomer = (e) => {
    e.preventDefault();

    const name = newCustomer.name.trim();
    const email = newCustomer.email.trim();
    const phone = newCustomer.phone.trim();

    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    const customer = {
      id: Date.now(),
      name,
      email,
      phone,
      service: newCustomer.service,
      status: newCustomer.status,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setCustomers((previous) => [...previous, customer]);

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      service: "Basic Support",
      status: "Active",
    });

    setShowAddModal(false);
  };

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "customer-status active";
    }
    return "customer-status inactive";
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="customers-content">
          {/* Page Header */}

          <div className="customers-page-header">
            <div>
              <h1>Customers</h1>
              <p>Manage and view all your customers.</p>
            </div>
            <button
              className="add-customer-button"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={18} />
              Add Customer
            </button>
          </div>

          {/* Filters */}

          <div className="customers-toolbar">
            <div className="customer-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="status-filter">
              <Filter size={17} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Customer Table */}

          <div className="customers-table-card">
            <div className="customers-table-header">
              <div>
                <h3>Customer List</h3>
                <p>{filteredCustomers.length} customers found</p>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <div className="customer-cell">
                            <div className="customer-avatar">
                              {customer.name.charAt(0)}
                            </div>
                            <div className="customer-name">
                              <strong>{customer.name}</strong>
                              <span>ID #{customer.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <span>
                              <Mail size={14} />
                              {customer.email}
                            </span>
                            <span>
                              <Phone size={14} />
                              {customer.phone}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="service-name">
                            <Briefcase size={14} />
                            {customer.service}
                          </span>
                        </td>
                        <td>
                          <span className={getStatusClass(customer.status)}>
                            {customer.status}
                          </span>
                        </td>
                        <td>{customer.joinedDate}</td>
                        <td>
                          <button
                            className="view-customer-button"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-customers">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Customer Details Modal */}

      {selectedCustomer && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >
          <div className="customer-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedCustomer(null)}
            >
              <X size={20} />
            </button>
            <div className="modal-profile">
              <div className="modal-avatar">
                {selectedCustomer.name.charAt(0)}
              </div>
              <h2>{selectedCustomer.name}</h2>
              <span className={getStatusClass(selectedCustomer.status)}>
                {selectedCustomer.status}
              </span>
            </div>
            <div className="customer-details">
              <div className="detail-item">
                <Mail size={18} />
                <div>
                  <span>Email</span>
                  <strong>{selectedCustomer.email}</strong>
                </div>
              </div>
              <div className="detail-item">
                <Phone size={18} />
                <div>
                  <span>Phone</span>
                  <strong>{selectedCustomer.phone}</strong>
                </div>
              </div>
              <div className="detail-item">
                <Briefcase size={18} />
                <div>
                  <span>Service</span>
                  <strong>{selectedCustomer.service}</strong>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">#</div>
                <div>
                  <span>Customer ID</span>
                  <strong>#{selectedCustomer.id}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="customer-modal add-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-modal-header">
              <div>
                <h2>Add Customer</h2>
                <p>Enter the customer's information.</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCustomer}>
              <div className="modal-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="customer@example.com"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Service</label>
                  <select
                    name="service"
                    value={newCustomer.service}
                    onChange={handleInputChange}
                  >
                    <option>Basic Support</option>
                    <option>Premium Support</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newCustomer.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-customer-button">
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
