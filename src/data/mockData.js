export const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    service: "Premium Support",
    status: "Active",
    joinedDate: "2026-01-15",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "9876501234",
    service: "Basic Support",
    status: "Active",
    joinedDate: "2026-02-10",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit.verma@example.com",
    phone: "9812345678",
    service: "Technical Support",
    status: "Inactive",
    joinedDate: "2025-12-20",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "9898989898",
    service: "Premium Support",
    status: "Active",
    joinedDate: "2026-03-05",
  },
  {
    id: 5,
    name: "Vikas Kumar",
    email: "vikas.kumar@example.com",
    phone: "9765432109",
    service: "Basic Support",
    status: "Inactive",
    joinedDate: "2025-11-18",
  },
];

export const serviceRequests = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Premium Support",
    request: "Account upgrade",
    status: "Pending",
    date: "2026-09-25",
  },
  {
    id: 2,
    customer: "Priya Singh",
    service: "Basic Support",
    request: "Password reset",
    status: "Completed",
    date: "2026-09-24",
  },
  {
    id: 3,
    customer: "Sneha Gupta",
    service: "Premium Support",
    request: "Technical issue",
    status: "In Progress",
    date: "2026-09-23",
  },
  {
    id: 4,
    customer: "Amit Verma",
    service: "Technical Support",
    request: "Service cancellation",
    status: "Pending",
    date: "2026-09-22",
  },
];

export const dashboardStats = {
  Today: {
    totalCustomers: 5,
    activeServices: 3,
    pendingRequests: 2,
    revenue: 4580,
  },

  "This Week": {
    totalCustomers: 18,
    activeServices: 12,
    pendingRequests: 7,
    revenue: 15240,
  },

  "This Month": {
    totalCustomers: 42,
    activeServices: 28,
    pendingRequests: 15,
    revenue: 42800,
  },
};
