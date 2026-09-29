# Customer Service Dashboard

A responsive customer service management dashboard built using React and Vite.

This project was developed in two stages:

- Day 1: Built the core dashboard, login screen, customer management interface, and mock data.
- Day 2: Added interactions, validation, reusable components, UI states, filtering, sorting, and responsive improvements.

The application is completely frontend-based and uses mock JavaScript data. No backend or API is required.

---

## Live Project

GitHub Repository:
https://github.com/NGiri11/customer-service-dashboard

---

## Project Overview

The Customer Service Dashboard is a frontend prototype designed to help customer service teams manage customers and service requests from a centralized dashboard.

The application provides:

- Frontend login
- Protected dashboard routes
- Dashboard summary statistics
- Customer management
- Customer search and filtering
- Service request management
- Add customer functionality
- Customer details view
- Form validation
- Responsive design
- Loading and empty states
- Reusable React components

---

# Day 1 – Core Application

## Day 1 Objective

Build the basic customer service dashboard with:

- Login screen
- Dashboard
- Sidebar navigation
- Header
- Summary cards
- Recent service requests
- Customer management page
- Search functionality
- Status filtering
- Customer details
- Mock data

---

## Login Screen

The application starts with a login page.

### Features

- Email input
- Password input
- Login button
- Basic validation
- Frontend-only login
- Navigation to dashboard after successful login

No backend authentication is used.

The login state is stored using browser localStorage.

---

## Dashboard

The dashboard provides an overview of customer service activity.

### Summary Cards

The dashboard contains four summary cards:

1. Total Customers
2. Active Services
3. Pending Requests
4. Revenue

The dashboard also contains a recent service requests table.

---

## Recent Service Requests

The service request table displays:

- Customer
- Service
- Request
- Status
- Date

Example service request statuses:

- Pending
- In Progress
- Completed

---

## Customer Management

The Customers page provides a list of customers.

Each customer contains information such as:

- Name
- Email
- Phone
- Service
- Status
- Joined Date

### Customer Features

- View customer list
- Search customers
- Filter customers by status
- View customer details
- Add new customers

---

# Day 2 – Interactions & Improvements

## Day 2 Objective

Improve the Day-1 application by adding:

- Functional interactions
- Dynamic dashboard data
- Form validation
- Loading states
- Empty states
- Reusable components
- Better customer management
- Service request filtering and sorting
- Responsive improvements
- Cleaner component structure

---

## Improved Login

The login functionality was enhanced with validation.

### Validation

The login form checks:

- Email is required
- Email format is valid
- Password is required
- Password has a minimum length

Validation errors are displayed clearly to the user.

### Login Flow

Login
↓
Validate Email & Password
↓
Successful Login
↓
Dashboard

---

## Protected Routes

Protected routes were added using a reusable ProtectedRoute component.

Users who are not logged in cannot directly access:

/dashboard
/customers

They are redirected to:

/login

---

## Logout

A logout option is available in the sidebar.

When the user logs out:

1. The login state is removed from localStorage.
2. The user is redirected to the login page.

---

## Dynamic Dashboard

The dashboard supports period-based filtering.

Available periods:

- Today
- This Week
- This Month

The four dashboard cards update dynamically based on the selected period.

All values are stored as mock data.

---

## Loading State

A loading state was added to the dashboard.

When the selected dashboard period changes, the application displays:

Loading dashboard...

---

## Service Request Search

The Recent Service Requests table supports searching.

Users can search by:

- Customer name
- Service
- Request

---

## Service Request Status Filter

Users can filter service requests by status.

Available options:

- All Statuses
- Pending
- In Progress
- Completed

---

## Service Request Sorting

The service request table supports basic date sorting.

Users can switch between:

- Newest
- Oldest

---

## Empty States

The application displays an empty state when no service requests match the current search or filter.

Example:

No service requests found

Try changing your search or status filter.

A similar empty state is available on the Customers page.

---

## Improved Customer Management

The Customers page supports:

- Customer search
- Status filtering
- Add Customer
- Customer validation
- Customer details

### Customer Search

Customers can be searched by:

- Name
- Email
- Phone

### Status Filter

Customers can be filtered by:

- Active
- Inactive

---

## Add Customer

An Add Customer button opens a modal containing a customer form.

The form includes:

- Name
- Email
- Phone
- Status

---

## Customer Form Validation

The Add Customer form performs basic validation.

Validation errors are displayed directly below the relevant fields.

---

## Successful Customer Submission

After successfully adding a customer:

- The customer is added to the mock customer list.
- The customer table updates immediately.
- A success message is displayed.

Example:

Customer added successfully!

New customers are not persisted after a browser refresh because the application uses mock data and React state.

---

## Customer Details

Clicking a customer opens a details modal.

The details view displays information about the selected customer without requiring the user to leave the Customers page.

---

# Reusable Components

Reusable components were introduced to reduce duplicated UI code.

Current reusable components include:

- Header.jsx
- Input.jsx
- Modal.jsx
- ProtectedRoute.jsx
- ServiceRequestsTable.jsx
- Sidebar.jsx
- StatusBadge.jsx
- SummaryCard.jsx

### Component Responsibilities

| Component            | Purpose                               |
| -------------------- | ------------------------------------- |
| Header               | Application top navigation/header     |
| Input                | Reusable form input                   |
| Modal                | Reusable modal/dialog                 |
| ProtectedRoute       | Protects authenticated routes         |
| ServiceRequestsTable | Displays and manages service requests |
| Sidebar              | Dashboard navigation                  |
| StatusBadge          | Displays status labels                |
| SummaryCard          | Displays dashboard statistics         |

---

# UI States

The application includes:

- Loading state
- Empty state
- Validation state
- Success state
- No search results state

---

# Responsive Design

The application is responsive and designed to work across:

- Desktop
- Tablet
- Mobile

Responsive improvements include:

- Compact sidebar on smaller screens
- Responsive dashboard cards
- Responsive filters
- Horizontal table scrolling on smaller screens
- Responsive customer modals
- Adjusted spacing and typography
- Mobile-friendly layout

---

# Project Structure

customer-service-dashboard/
│
├── public/
│
├── src/
│ ├── assets/
│ │
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── Input.jsx
│ │ ├── Modal.jsx
│ │ ├── ProtectedRoute.jsx
│ │ ├── ServiceRequestsTable.jsx
│ │ ├── Sidebar.jsx
│ │ ├── StatusBadge.jsx
│ │ └── SummaryCard.jsx
│ │
│ ├── data/
│ │ └── mockData.js
│ │
│ ├── pages/
│ │ ├── Customers.jsx
│ │ ├── Dashboard.jsx
│ │ └── Login.jsx
│ │
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- JSX
- CSS

## Libraries

- React Router DOM
- Lucide React

## Data

- JavaScript mock objects
- React state

## Authentication

- Frontend-only authentication
- Browser localStorage

---

# Installation

Clone the repository:

git clone https://github.com/NGiri11/customer-service-dashboard.git

Navigate to the project:

cd customer-service-dashboard

Install dependencies:

npm install

Start the development server:

npm run dev

---

# Production Build

To create a production build:

npm run build

The project successfully builds using Vite.

---

# Application Flow

Login
↓
Email & Password
↓
Validation
↓
Dashboard
├── Summary Cards
├── Period Filter
└── Service Requests
├── Search
├── Status Filter
└── Sort

Dashboard
└── Customers
├── Search
├── Filter
├── Add Customer
└── View Details

---

# Assignment Requirements

| Requirement            |    Day 1     |         Day 2          |
| ---------------------- | :----------: | :--------------------: |
| Login Screen           |     Yes      |          Yes           |
| Email & Password       |     Yes      |          Yes           |
| Login Validation       |    Basic     |        Enhanced        |
| Dashboard              |     Yes      |          Yes           |
| Sidebar Navigation     |     Yes      |          Yes           |
| Header                 |     Yes      |          Yes           |
| Summary Cards          |     Yes      |        Dynamic         |
| Recent Requests        |     Yes      | Search / Filter / Sort |
| Customer List          |     Yes      |          Yes           |
| Customer Search        |     Yes      |          Yes           |
| Customer Status Filter |     Yes      |          Yes           |
| Add Customer           |    Basic     |   Modal + Validation   |
| Customer Details       |     Yes      |         Modal          |
| Mock Data              |     Yes      |          Yes           |
| Loading State          |      No      |          Yes           |
| Empty State            |      No      |          Yes           |
| Success State          |      No      |          Yes           |
| Reusable Components    |    Basic     |          Yes           |
| Responsive Design      |    Basic     |        Improved        |
| Backend / API          | Not Required |      Not Required      |

---

# Data Handling

This project intentionally does not use a backend or API.

Mock data is maintained in:

src/data/mockData.js

The project contains mock data for:

- Customers
- Service requests
- Dashboard statistics

Dashboard statistics are available for:

- Today
- This Week
- This Month

Customer state is shared through React state in App.jsx.

Newly added customers are available during the current session but are reset when the page is refreshed.

---

# Authentication Note

This project uses frontend-only authentication for demonstration purposes.

It does not provide real security or server-side authentication.

A production version would require:

- Backend authentication
- Password hashing
- Secure sessions or JWT
- Database
- API authorization
- Server-side validation

These are intentionally outside the scope of this frontend assignment.

---

# Future Improvements

Possible future improvements include:

- Backend REST API
- MySQL or MongoDB database
- Real authentication
- JWT-based authorization
- Persistent customer data
- Customer editing and deletion
- Service request creation
- Advanced dashboard analytics
- Pagination
- User roles and permissions
- Deployment
- Automated testing

---

# Author

**Navneet Giri**

GitHub:

https://github.com/NGiri11

---

# Project Status

**Day 1:** Completed

**Day 2:** Completed

The current version is a functional frontend prototype with:

- Interactive dashboard
- Customer management
- Search and filtering
- Service request sorting
- Form validation
- Loading and empty states
- Reusable React components
- Mock data
- Responsive design
