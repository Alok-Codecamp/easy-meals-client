# 🍱 Easy Meals

**Live link**[https://easy-meals-silk.vercel.app/](https://easy-meals-silk.vercel.app/)
**Easy Meals** is a full-stack meal subscription platform that connects **customers** with **meal providers**. It enables users to select meals based on dietary preferences, manage orders, and offers role-based dashboards for customers and providers. Built with **Next.js** and powered by a secure Express backend.

---

## 🔑 Key Features

### 1. 🔐 User Authentication

- Custom login system for both customers and meal providers via **email or phone number**.
- Secure login with **JWT (JSON Web Tokens)** for authentication.
- **Bcrypt** is used to hash passwords before storing them.

### 2. 🧑‍🍳 Customer & Meal Provider Dashboards

- **Customer Dashboard**:

  - Select meal plans.
  - Track active and past orders.
  - Manage dietary preferences.

- **Meal Provider Dashboard**:
  - Add, edit, and delete meal items.
  - View and respond to customer orders.
  - Track delivery status and performance.

### 3. 🥗 Meal Selection & Preferences

- Customers can:
  - Choose meal plans.
  - Customize meals based on dietary needs (e.g., **vegan**, **keto**, **gluten-free**).
- Meal providers can:
  - Create meal listings.
  - Specify ingredients, portion sizes, and pricing.

### 4. 🔎 Smart Search & Match System

- Customers can search meals by:

  - Cuisine
  - Dietary preferences
  - Ratings
  - Availability

- Meal Providers:
  - View customer preferences.
  - Prepare meals accordingly.

### 5. 🛂 Role-Based Access Control

- **Customer** and **Meal Provider** roles are enforced with protected routes and views.
- Each user type accesses only their dashboard and related features.
- _(Optional)_ **Admin role** for managing platform-wide users and content.

### 6. ⚙️ Full CRUD Functionality

- **Customers** can:

  - Create, view, update, and manage their meal plans and preferences.

- **Meal Providers** can:
  - Manage meals and handle customer requests.

---

## 🛠️ Tech Stack

### Frontend:

- **Next.js** (App Router)
- **React**, **Tailwind CSS**
- **Redux Toolkit + RTK Query**
- **React Hook Form + Zod**

### Backend:

- **Express.js** with MVC structure
- **MongoDB + Mongoose**
- **JWT**, **bcrypt**, **cookie-parser**

---

## 🌐 Live URLs

- **Frontend**: [https://easy-meals-silk.vercel.app](https://easy-meals-silk.vercel.app)
- **Backend**: [https://easy-meals-api.onrender.com](https://easy-meals-api.onrender.com)

---

## 🧑‍💻 Getting Started (Local Development)

### 1. Clone the Project

```bash
git clone https://github.com/Alok-Codecamp/easy-meals-client.git

```
