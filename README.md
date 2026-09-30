# Customer Service Dashboard

A responsive customer service management dashboard built using React and Vite.

This project was developed as a three-day frontend assignment. It focuses on building a functional customer service dashboard with mock data, reusable React components, validation, UI states, responsive design, and end-to-end frontend interactions.

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
- Dashboard period filtering
- Service request search
- Service request status filtering
- Service request sorting
- Customer management
- Customer search and filtering
- Add customer functionality
- Customer form validation
- Duplicate email validation
- Customer details view
- Delete customer functionality
- Delete confirmation
- Loading states
- Empty states
- Validation and error states
- Success feedback
- Responsive design
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

The login state is stored using browser `localStorage`.

## Dashboard

The dashboard provides an overview of customer service activity.

### Summary Cards

The dashboard contains four summary cards:

1. Total Customers
2. Active Services
3. Pending Requests
4. Revenue

The dashboard also contains a recent service requests table.

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

```text
Login
  ↓
Validate Email & Password
  ↓
Successful Login
  ↓
Dashboard
```

## Protected Routes

Protected routes were added using a reusable `ProtectedRoute` component.

Users who are not logged in cannot directly access:

- `/dashboard`
- `/customers`

They are redirected to:

- `/login`

## Logout

A logout option is available in the sidebar.

When the user logs out:

1. The login state is removed from `localStorage`.
2. The user is redirected to the login page.

## Dynamic Dashboard

The dashboard supports period-based filtering.

Available periods:

- Today
- This Week
- This Month

The four dashboard cards update dynamically based on the selected period.

All values are stored as mock data.

## Loading State

A loading state was added to the dashboard.

When the selected dashboard period changes, the application displays:

```text
Loading dashboard...
```

## Service Request Search

The Recent Service Requests table supports searching.

Users can search by:

- Customer name
- Service
- Request

## Service Request Status Filter

Users can filter service requests by status.

Available options:

- All Statuses
- Pending
- In Progress
- Completed

## Service Request Sorting

The service request table supports basic date sorting.

Users can switch between:

- Newest
- Oldest

## Empty States

The application displays an empty state when no service requests match the current search or filter.

Example:

```text
No service requests found

Try changing your search or status filter.
```

A similar empty state is available on the Customers page.

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

## Add Customer

An Add Customer button opens a modal containing a customer form.

The form includes:

- Name
- Email
- Phone
- Service
- Status

## Customer Form Validation

The Add Customer form performs basic validation.

Validation errors are displayed directly below the relevant fields.

The form also checks for duplicate customer email addresses.

## Successful Customer Submission

After successfully adding a customer:

- The customer is added to the mock customer list.
- The customer table updates immediately.
- A success message is displayed.
- The newly added customer can be searched and filtered.

New customers are not persisted after a browser refresh because the application uses mock data and React state.

## Customer Details

Clicking a customer opens a details modal.

The details view displays information about the selected customer without requiring the user to leave the Customers page.

---

# Day 3 – Finalization & Review

## Day 3 Objective

Finalize the frontend application with:

- End-to-end functionality
- Consistent UI/UX
- Edge-case handling
- Delete customer functionality
- Improved validation
- Responsive behavior
- Code quality
- Final testing
- Documentation

## Delete Customer

Customers can be deleted from the Customers page.

The delete flow includes:

1. Click the Delete button.
2. A confirmation modal opens.
3. The user can cancel the action.
4. The user can confirm deletion.
5. The customer is removed from the current React state.
6. A success message is displayed.

If the deleted customer is currently open in the details modal, the details modal is closed automatically.

Deletion is session-only because the project does not use a backend or persistent database.

## Edge-Case Handling

The application handles several common edge cases:

- Invalid login email
- Missing login password
- Invalid customer email
- Missing required customer fields
- Duplicate customer email
- Invalid phone number
- Empty search results
- Filters with no matching records
- Cancelled customer creation
- Cancelled customer deletion
- Multiple form submissions
- Missing optional customer fields
- Long customer information
- Empty customer dataset

## Consistent UI/UX

The final version provides consistent:

- Spacing
- Typography
- Buttons
- Forms
- Status badges
- Modals
- Success messages
- Empty states
- Loading states
- Responsive layouts

## Responsive Design

The application is designed to work across:

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

# Reusable Components

Reusable components were introduced to reduce duplicated UI code.

Current reusable components include:

- `Header.jsx`
- `Input.jsx`
- `Modal.jsx`
- `ProtectedRoute.jsx`
- `ServiceRequestsTable.jsx`
- `Sidebar.jsx`
- `StatusBadge.jsx`
- `SummaryCard.jsx`

### Component Responsibilities

| Component | Purpose |
|---|---|
| Header | Application top navigation/header |
| Input | Reusable form input |
| Modal | Reusable modal/dialog |
| ProtectedRoute | Protects authenticated routes |
| ServiceRequestsTable | Displays and manages service requests |
| Sidebar | Dashboard navigation |
| StatusBadge | Displays status labels |
| SummaryCard | Displays dashboard statistics |

---

# UI States

The application includes:

- Loading state
- Empty state
- Validation/error state
- Success state
- No search results state
- Delete confirmation state

---

# Project Structure

```text
customer-service-dashboard/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ServiceRequestsTable.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatusBadge.jsx
│   │   └── SummaryCard.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Customers.jsx
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

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
- Browser `localStorage`

---

# Installation

Clone the repository:

```bash
git clone https://github.com/NGiri11/customer-service-dashboard.git
```

Navigate to the project:

```bash
cd customer-service-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Production Build

To create a production build:

```bash
npm run build
```

The project builds using Vite.

---

# Code Quality

The project uses ESLint for code quality checks.

Run:

```bash
npm run lint
```

The final version was checked for lint errors before submission.

---

# Application Flow

```text
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
  ↓
Customers
  ├── Search
  ├── Status Filter
  ├── Add Customer
  ├── View Details
  └── Delete Customer
      └── Confirmation
  ↓
Logout
  ↓
Login
```

---

# Assignment Requirements

| Requirement | Day 1 | Day 2 | Day 3 |
|---|:---:|:---:|:---:|
| Login Screen | Yes | Yes | Yes |
| Email & Password | Yes | Yes | Yes |
| Login Validation | Basic | Enhanced | Final |
| Dashboard | Yes | Yes | Yes |
| Sidebar Navigation | Yes | Yes | Yes |
| Header | Yes | Yes | Yes |
| Summary Cards | Yes | Dynamic | Dynamic |
| Recent Requests | Yes | Search / Filter / Sort | Final |
| Customer List | Yes | Yes | Yes |
| Customer Search | Yes | Yes | Yes |
| Customer Status Filter | Yes | Yes | Yes |
| Add Customer | Basic | Modal + Validation | Final |
| Customer Details | Yes | Modal | Modal |
| Delete Customer | No | No | Yes |
| Loading State | No | Yes | Yes |
| Empty State | No | Yes | Yes |
| Success State | No | Yes | Yes |
| Validation / Error States | Basic | Yes | Enhanced |
| Reusable Components | Basic | Yes | Final |
| Responsive Design | Basic | Improved | Final |
| Backend / API | Not Required | Not Required | Not Required |

---

# Data Handling

This project intentionally does not use a backend or API.

Mock data is maintained in:

```text
src/data/mockData.js
```

The project contains mock data for:

- Customers
- Service requests
- Dashboard statistics

Dashboard statistics are available for:

- Today
- This Week
- This Month

Customer state is shared through React state in `App.jsx`.

Newly added customers and deleted customers are reflected immediately during the current session but are reset when the page is refreshed.

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

# Testing Checklist

The final application was tested for the following workflows:

### Authentication

- Login with valid input
- Login with missing fields
- Login with invalid email
- Login with short password
- Protected dashboard route
- Protected customers route
- Logout

### Dashboard

- Today filter
- This Week filter
- This Month filter
- Summary card updates
- Loading state
- Service request search
- Service request status filter
- Newest sorting
- Oldest sorting
- Empty/no-results state

### Customers

- Customer search
- Customer status filtering
- Add Customer modal
- Required-field validation
- Email validation
- Duplicate email validation
- Phone validation
- Successful customer creation
- Newly added customer search/filter
- Customer details modal
- Add modal cancellation
- Delete confirmation
- Cancel deletion
- Successful deletion
- Deleted customer search/filter update
- Empty customer state

### Responsive UI

- Desktop layout
- Tablet layout
- Mobile layout
- Sidebar adaptation
- Responsive tables
- Responsive forms
- Responsive modals

### Code Quality

```bash
npm run lint
npm run build
```

Both commands were successfully verified during final development.

---

# Known Limitations

Because this is a frontend-only assignment:

- No backend server
- No REST API
- No database
- Authentication is not real server-side authentication
- Customer additions are not persistent
- Customer deletions are not persistent
- Refreshing the page resets mock customer data
- Service requests use static mock data

---

# Future Improvements

Possible future improvements include:

- Backend REST API
- MySQL or MongoDB database
- Real authentication
- JWT-based authorization
- Persistent customer data
- Customer editing
- Service request creation and management
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
**Day 3:** Completed

The current version is a functional frontend customer service dashboard with:

- Interactive dashboard
- Dashboard period filtering
- Service request search, filtering, and sorting
- Customer management
- Customer search and filtering
- Add customer functionality
- Customer validation
- Customer details
- Delete customer functionality
- Delete confirmation
- Loading and empty states
- Success feedback
- Reusable React components
- Mock data
- Frontend-only authentication
- Responsive design
- ESLint validation
- Production build support

The project is ready for final frontend assignment review and demonstration.
