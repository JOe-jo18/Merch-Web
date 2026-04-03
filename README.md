# Merchandise Management System

A web-based application for managing merchandise inventory, sales, expenses, and reports.

## Features

- Dashboard with key statistics
- Collections management
- Vendor (team member) management
- Inventory tracking with filters
- Sales recording
- Expense tracking
- Financial reports
- Responsive design with mobile support
- Hamburger navigation menu

## Technologies

- HTML5
- CSS3 (with responsive design)
- JavaScript (ES6+ with async/await for API calls)

## Backend Integration

The application is designed to connect to a REST API backend. Configure the `API_BASE_URL` in `script.js` to point to your backend server.

### API Endpoints

- `GET /api/dashboard` - Dashboard statistics
- `GET /api/collections` - List collections
- `POST /api/collections` - Add new collection
- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Add new vendor
- `GET /api/inventory` - List inventory items
- `POST /api/inventory` - Add new inventory item
- `GET /api/expenses` - List expenses
- `POST /api/expenses` - Add new expense
- `GET /api/sales` - List sales
- `POST /api/sales` - Add new sale
- `GET /api/reports?from=...&to=...` - Generate reports

## Setup

1. Clone or download the project files.
2. Open `index.html` in a web browser.
3. For full functionality, set up a backend server providing the above API endpoints.

## Responsive Design

The application is fully responsive and works on desktop, tablet, and mobile devices. The navigation menu collapses to a hamburger menu on smaller screens.

## Browser Support

- Modern browsers with ES6 support
- Chrome, Firefox, Safari, Edge

## Future Enhancements

- User authentication
- Data export to CSV/PDF
- Advanced filtering and search
- Charts and graphs for reports
- Real-time updates with WebSockets