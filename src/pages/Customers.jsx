import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import Input from "../components/Input";

function Customers({ customers, setCustomers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Basic Support",
    status: "Active",
  });

  /* Filter customers */

  const filteredCustomers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  /* Handle form input */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* Validate form */

  const validateForm = () => {
    const errors = {};

    const name = newCustomer.name.trim();
    const email = newCustomer.email.trim();
    const phone = newCustomer.phone.trim();

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 2) {
      errors.name = "Name must contain at least 2 characters.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else {
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(phone)) {
        errors.phone = "Phone number must contain exactly 10 digits.";
      }
    }
    return errors;
  };

  /* Add customer */

  const handleAddCustomer = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const customer = {
      id: Date.now(),
      name: newCustomer.name.trim(),
      email: newCustomer.email.trim(),
      phone: newCustomer.phone.trim(),
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

    setFormErrors({});
    setShowAddModal(false);

    setSuccessMessage(`${customer.name} was added successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  /* Open Add Customer modal */

  const openAddModal = () => {
    setFormErrors({});
    setShowAddModal(true);
  };

  /* Empty state text */

  const hasFilters = searchTerm.trim() !== "" || statusFilter !== "All";

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
              type="button"
              onClick={openAddModal}
            >
              <Plus size={18} />
              Add Customer
            </button>
          </div>

          {/* Success Message */}

          {successMessage && (
            <div className="success-message">✓ {successMessage}</div>
          )}

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
            {filteredCustomers.length === 0 ? (
              <div className="customer-empty-state">
                <div className="empty-state-icon">
                  <Search size={24} />
                </div>
                <h4>
                  {hasFilters ? "No customers found" : "No customers available"}
                </h4>
                <p>
                  {hasFilters
                    ? "Try changing your search or status filter."
                    : "Add your first customer to get started."}
                </p>
                {!hasFilters && (
                  <button
                    className="add-customer-button"
                    type="button"
                    onClick={openAddModal}
                  >
                    <Plus size={18} />
                    Add Customer
                  </button>
                )}
              </div>
            ) : (
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
                    {filteredCustomers.map((customer) => (
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
                          <StatusBadge status={customer.status} />
                        </td>
                        <td>{customer.joinedDate}</td>
                        <td>
                          <button
                            className="view-customer-button"
                            type="button"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Customer Details Modal */}

      <Modal
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        className="details-modal"
      >
        {selectedCustomer && (
          <>
            <div className="modal-profile">
              <div className="modal-avatar">
                {selectedCustomer.name.charAt(0)}
              </div>
              <h2>{selectedCustomer.name}</h2>
              <StatusBadge status={selectedCustomer.status} />
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
          </>
        )}
      </Modal>

      {/* Add Customer Modal */}

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormErrors({});
        }}
        title="Add Customer"
        description="Enter the customer's information."
        className="add-modal"
      >
        <form onSubmit={handleAddCustomer}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter customer name"
            value={newCustomer.name}
            onChange={handleInputChange}
            error={formErrors.name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="customer@example.com"
            value={newCustomer.email}
            onChange={handleInputChange}
            error={formErrors.email}
          />
          <Input
            label="Phone"
            name="phone"
            type="text"
            placeholder="Enter 10-digit phone number"
            value={newCustomer.phone}
            onChange={handleInputChange}
            error={formErrors.phone}
          />
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label htmlFor="service">Service</label>
              <select
                id="service"
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
              <label htmlFor="status">Status</label>
              <select
                id="status"
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
              onClick={() => {
                setShowAddModal(false);
                setFormErrors({});
              }}
            >
              Cancel
            </button>
            <button type="submit" className="save-customer-button">
              Add Customer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Customers;
