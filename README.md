# Multi Vendor E-Commerce Admin Panel

A full-stack MERN Admin Dashboard for managing Vendors, Products, Orders, and Analytics.

---

## Features

### Authentication & Authorization
- JWT Authentication
- Login/Register
- Role-based access (Admin & Vendor)
- Protected Routes
- Password hashing using bcrypt

### Vendor Management
- Create Vendor
- Edit Vendor
- Block / Unblock Vendor
- Search Vendors
- Pagination

### Product Management
- Add Product
- Edit Product
- Delete Product
- Product Image Upload
- Search / Filter / Sort
- Pagination

### Order Management
- Create Dummy Orders
- View Orders
- Update Delivery Status
- Search Orders
- Filter Orders
- Revenue Calculation

### Dashboard Analytics
- Total Vendors
- Total Products
- Total Orders
- Revenue Overview
- Monthly Revenue Graph

### Additional Features
- Mobile Responsive UI
- MongoDB Atlas Integration
- REST APIs
- Multer Image Upload
- Error Handling & Validation

# Environment Variables

The project includes a sample environment file:

```bash
server/.env.example
```

Create a `.env` file inside the `server` folder and add your own values.

Example:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
---

# Tech Stack

## Frontend
- React.js
- React Router
- Tailwind CSS
- Context API
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Multer

---

# Folder Structure

```bash
client/
server/
