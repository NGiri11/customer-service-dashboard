import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
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
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const name = customer.name?.toString().toLowerCase() || "";
      const email = customer.email?.toString().toLowerCase() || "";
      const phone = customer.phone?.toString() || "";

      const matchesSearch =
        name.includes(search) ||
        email.includes(search) ||
        phone.includes(search);

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

    /* Name validation */

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 2) {
      errors.name = "Name must contain at least 2 characters.";
    }

    /* Email validation */

    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address.";
      } else {
        const emailExists = customers.some(
          (customer) =>
            customer.email?.trim().toLowerCase() === email.toLowerCase(),
        );

        if (emailExists) {
          errors.email = "A customer with this email already exists.";
        }
      }
    }

    /* Phone validation */

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

  /* Reset customer form */

  const resetCustomerForm = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      service: "Basic Support",
      status: "Active",
    });

    setFormErrors({});
    setIsSubmitting(false);
  };

  /* Add customer */

  const handleAddCustomer = (e) => {
    e.preventDefault();

    /* Prevent multiple submissions */

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const errors = validateForm();

    /* Stop submission if validation fails */

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
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

    /* Add customer to shared state */

    setCustomers((previous) => [...previous, customer]);

    /* Reset form */

    resetCustomerForm();

    setShowAddModal(false);

    /* Success feedback */

    setSuccessMessage(`${customer.name} was added successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  /* Open Add Customer modal */

  const openAddModal = () => {
    resetCustomerForm();
    setShowAddModal(true);
  };

  /* Close Add Customer modal */

  const closeAddModal = () => {
    resetCustomerForm();
    setShowAddModal(false);
  };

  /* Open Delete Confirmation */

  const openDeleteConfirmation = (customer) => {
    setCustomerToDelete(customer);
  };

  /* Close Delete Confirmation */

  const closeDeleteConfirmation = () => {
    setCustomerToDelete(null);
  };

  /* Delete customer */

  const handleDeleteCustomer = () => {
    if (!customerToDelete) {
      return;
    }

    const deletedCustomerName = customerToDelete.name || "Customer";

    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== customerToDelete.id),
    );

    /* Close details modal if the deleted customer was selected */

    if (selectedCustomer?.id === customerToDelete.id) {
      setSelectedCustomer(null);
    }

    setCustomerToDelete(null);

    /* Success feedback */

    setSuccessMessage(`${deletedCustomerName} was deleted successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
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
                aria-label="Search customers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="status-filter">
              <Filter size={17} />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter customers by status"
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
              /* Empty / No Results State */

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
              /* Customer Table */

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
                    {filteredCustomers.map((customer) => {
                      const customerName = customer.name || "Unknown Customer";

                      const customerEmail =
                        customer.email || "No email available";

                      const customerPhone =
                        customer.phone || "No phone available";

                      const customerService =
                        customer.service || "Service not specified";

                      const customerStatus = customer.status || "Unknown";

                      const customerJoinedDate =
                        customer.joinedDate || "Not available";

                      return (
                        <tr key={customer.id}>
                          <td>
                            <div className="customer-cell">
                              <div className="customer-avatar">
                                {customerName.charAt(0).toUpperCase()}
                              </div>
                              <div className="customer-name">
                                <strong>{customerName}</strong>
                                <span>ID #{customer.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <span>
                                <Mail size={14} />
                                {customerEmail}
                              </span>
                              <span>
                                <Phone size={14} />
                                {customerPhone}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="service-name">
                              <Briefcase size={14} />
                              {customerService}
                            </span>
                          </td>
                          <td>
                            <StatusBadge status={customerStatus} />
                          </td>
                          <td>{customerJoinedDate}</td>
                          <td>
                            <div className="customer-action-buttons">
                              <button
                                className="view-customer-button"
                                type="button"
                                onClick={() => setSelectedCustomer(customer)}
                              >
                                <Eye size={16} />
                                View
                              </button>
                              <button
                                className="delete-customer-button"
                                type="button"
                                onClick={() => openDeleteConfirmation(customer)}
                                aria-label={`Delete ${customerName}`}
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
                {(selectedCustomer.name || "U").charAt(0).toUpperCase()}
              </div>
              <h2>{selectedCustomer.name || "Unknown Customer"}</h2>
              <StatusBadge status={selectedCustomer.status || "Unknown"} />
            </div>
            <div className="customer-details">
              <div className="detail-item">
                <Mail size={18} />
                <div>
                  <span>Email</span>
                  <strong>
                    {selectedCustomer.email || "No email available"}
                  </strong>
                </div>
              </div>
              <div className="detail-item">
                <Phone size={18} />
                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedCustomer.phone || "No phone available"}
                  </strong>
                </div>
              </div>
              <div className="detail-item">
                <Briefcase size={18} />
                <div>
                  <span>Service</span>
                  <strong>
                    {selectedCustomer.service || "Service not specified"}
                  </strong>
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
        onClose={closeAddModal}
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
              onClick={closeAddModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-customer-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Customer"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}

      <Modal
        isOpen={Boolean(customerToDelete)}
        onClose={closeDeleteConfirmation}
        title="Delete Customer?"
        description={
          customerToDelete
            ? `Are you sure you want to delete ${
                customerToDelete.name || "this customer"
              }?`
            : ""
        }
        className="delete-modal"
      >
        <div className="delete-confirmation">
          <p>This action will remove the customer from the current session.</p>
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={closeDeleteConfirmation}
            >
              Cancel
            </button>
            <button
              type="button"
              className="delete-confirm-button"
              onClick={handleDeleteCustomer}
            >
              <Trash2 size={17} />
              Delete Customer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Customers;
