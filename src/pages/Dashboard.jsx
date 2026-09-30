import { useEffect, useState } from "react";
import { Users, Briefcase, Clock, DollarSign } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import ServiceRequestsTable from "../components/ServiceRequestsTable";

import { dashboardStats } from "../data/mockData";

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [isLoading, setIsLoading] = useState(false);

  const stats = dashboardStats[selectedPeriod];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  const handlePeriodChange = (e) => {
    setIsLoading(true);
    setSelectedPeriod(e.target.value);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          <div className="welcome-section">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's what's happening today.</p>
            </div>
            <div className="dashboard-filter">
              <label htmlFor="period-filter">Period</label>
              <select
                id="period-filter"
                value={selectedPeriod}
                onChange={handlePeriodChange}
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="dashboard-loading">
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <>
              <div className="summary-grid">
                <SummaryCard
                  title="Total Customers"
                  value={stats.totalCustomers}
                  icon={<Users size={22} />}
                  trend="+12.5%"
                  description={selectedPeriod}
                />
                <SummaryCard
                  title="Active Services"
                  value={stats.activeServices}
                  icon={<Briefcase size={22} />}
                  trend="+8.2%"
                  description={selectedPeriod}
                />
                <SummaryCard
                  title="Pending Requests"
                  value={stats.pendingRequests}
                  icon={<Clock size={22} />}
                  trend="-4.3%"
                  description={selectedPeriod}
                />
                <SummaryCard
                  title="Revenue"
                  value={`$${stats.revenue.toLocaleString()}`}
                  icon={<DollarSign size={22} />}
                  trend="+15.8%"
                  description={selectedPeriod}
                />
              </div>
              <ServiceRequestsTable />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
