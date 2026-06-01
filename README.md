# Fullstack Ecommerce Project

A professional, responsive fullstack ecommerce web application built with React, Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM
- **Backend**: Node.js, Express, JWT Authentication, bcryptjs
- **Database**: MongoDB (Atlas)
- **Deployment**: Configured for Northflank / Heroku Buildpacks

## 📂 Project Structure

```
/ (root)
├── package.json (Monorepo orchestration)
├── backend/
│   ├── config/ (DB connection)
│   ├── controllers/ (Route logic)
│   ├── models/ (Mongoose schemas)
│   ├── routes/ (API endpoints)
│   └── server.js (Main entry point)
└── frontend/
    ├── src/ (React source)
    ├── public/
    └── index.html
```

## 🚀 Deployment (Northflank)

This project is configured for **Northflank Combined Service** using the **Heroku Buildpack**.

### Steps to Deploy:

1. **Create a new Service** on Northflank.
2. Select **Combined Service**.
3. Link your **GitHub Repository**.
4. Choose **Buildpack** (Heroku) as the build method.
5. Northflank will automatically detect the root `package.json` and run `heroku-postbuild` to build the frontend and install backend dependencies.

### Required Environment Variables:

Configure these in the **Environment** tab of your Northflank service:

| Variable | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A secure random string for JWT |
| `PORT` | `8080` (or leave default, Northflank provides this) |

## 🛠 Features

- ✅ High-Fidelity UI matching design screenshots
- ✅ Dynamic Product Management (CRUD)
- ✅ Admin Control Center with User Registry
- ✅ JWT Authentication & Protected Routes
- ✅ Shopping Cart with localStorage persistence
- ✅ Search & Category Filtering
- ✅ Responsive Design (Mobile, Tablet, Desktop)

## 🏁 Getting Started

### Local Development

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Seeding Database**:
   ```bash
   cd backend
   node seeder.js
   ```

## 📜 License

This project is for internship purposes.
