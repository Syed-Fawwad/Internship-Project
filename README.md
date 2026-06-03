---
title: E-Commerce Enterprise
emoji: 🚀
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
license: mit
---

# 🛒 Fullstack E-Commerce Enterprise Hub

A high-performance, responsive fullstack ecommerce platform built with the **MERN** stack (MongoDB, Express, React, Node.js). This project features a meticulously restored high-fidelity UI, professional admin oversight tools, and a specialized mobile experience.

## 🚀 Live Demo
- **Frontend (Vercel)**: [Live Link](https://internship-project-navy.vercel.app/)
- **Backend API (Railway/Hugging Face)**: [API Status](https://internship-project-production-98ac.up.railway.app/)

---

## ✨ Key Features

### 💻 Professional Desktop Experience
*   **High-Fidelity UI**: Pixel-perfect restoration matching professional design specifications.
*   **Dynamic Inventory**: Real-time product fetching from MongoDB Atlas with smart caching.
*   **Advanced Search**: Global search functionality with category-based filtering.
*   **Integrated Cart**: Persistent shopping cart with quantity management and "Save for later" logic.

### 📱 Trending Mobile UI
*   **App-Style Navigation**: Smooth slide-out navigation drawer with glass-morphism effects.
*   **Snap-to-Scroll**: Horizontal snapping category sections for intuitive browsing.
*   **Bottom-Sheet Filters**: Professional overlay filtering system optimized for touch.
*   **Responsive Flow**: Seamless transition between layouts using Tailwind's advanced breakpoint system.

### 🔐 Admin Control Center
*   **Multi-Tab Hub**: Dedicated sections for **Inventory Management** and **User Registry**.
*   **Business Intelligence**: Live analytics dashboard showing total inventory value, stock alerts, and user growth.
*   **Full CRUD**: Secure administrative tools to Create, Read, Update, and Delete products and user accounts.
*   **Protected Routes**: Multi-level authentication (Admin vs. User) secured by JWT.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router 6, Context API |
| **Backend** | Node.js, Express 5, JWT, BcryptJS, Morgan |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **DevOps** | Docker, Vercel, Railway/Hugging Face |

---

## 📂 Project Architecture

```text
/ (root)
├── backend/            # Express API Server
│   ├── config/         # Database & App Config
│   ├── controllers/    # Business Logic
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry Point
├── frontend/           # React Frontend (Vite)
│   ├── public/         # Static Production Assets
│   └── src/
│       ├── components/ # Reusable UI Modules
│       ├── pages/      # View Components
│       └── utils/      # API Helpers & Context
└── Dockerfile          # Production Container Config
```

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### 2. Local Setup
1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/Syed-Fawwad/Internship-Project.git
    cd Internship-Project
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Create .env with MONGO_URI, JWT_SECRET, PORT=5000
    npm run dev
    ```

3.  **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    # Create .env with VITE_API_URL=http://localhost:5000/api
    npm run dev
    ```

4.  **Seed Data**:
    ```bash
    cd ../backend
    node seeder.js
    ```

---

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: Random string for token signing.
- `PORT`: Default is 5000.

### Frontend (`/frontend/.env`)
- `VITE_API_URL`: Your live or local API endpoint.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

**Built for the Professional Web Engineering Internship.**
