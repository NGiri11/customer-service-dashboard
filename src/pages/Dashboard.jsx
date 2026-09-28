import { Users, Briefcase, Clock, DollarSign } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import ServiceRequestsTable from "../components/ServiceRequestsTable";
import { serviceRequests } from "../data/mockData";

function Dashboard({ customers }) {
  const totalCustomers = customers.length;

  const activeServices = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const pendingRequests = serviceRequests.filter(
    (request) => request.status === "Pending",
  ).length;

  const revenue = 24580;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">
          {/* Welcome Section */}

          <div className="welcome-section">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's what's happening today.</p>
            </div>
          </div>

          {/* Summary Cards */}

          <div className="summary-grid">
            <SummaryCard
              title="Total Customers"
              value={totalCustomers}
              icon={<Users size={22} />}
              trend="+12.5%"
              description="from last month"
            />
            <SummaryCard
              title="Active Services"
              value={activeServices}
              icon={<Briefcase size={22} />}
              trend="+8.2%"
              description="from last month"
            />
            <SummaryCard
              title="Pending Requests"
              value={pendingRequests}
              icon={<Clock size={22} />}
              trend="-4.3%"
              description="from last month"
            />
            <SummaryCard
              title="Revenue"
              value={`$${revenue.toLocaleString()}`}
              icon={<DollarSign size={22} />}
              trend="+15.8%"
              description="from last month"
            />
          </div>

          {/* Recent Requests */}

          <ServiceRequestsTable />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
