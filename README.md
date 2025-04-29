# Digital Assets Trading System

This is a full-stack web application for managing and trading digital assets such as cryptocurrencies, stocks, and tokens. The system is built as a Single Page Application (SPA) using React for the frontend and Node.js with Express for the backend. Data is stored in a MySQL database. The architecture is modular and scalable, following best practices for separation of concerns.

## Main Features

- User registration and login with token-based authentication
- Buying and selling of assets with quantity management
- Real-time portfolio updates and visualization
- Transaction logging with date, time, asset, quantity, and price
- Pie chart displaying asset distribution
- Protected routes for authenticated users only
- Contact page and responsive layout

## Technologies Used

- **Frontend**: React, TypeScript, Axios, CSS Modules, Recharts
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL (using `mysql2`)
- **Authentication**: Custom context-based auth with JWT-like logic (no third-party auth)

## Folder Structure

### Backend (`/server`)
- `config/`: database configuration (`db.ts`)
- `controllers/`: handle HTTP requests (e.g. holdings, auth)
- `services/`: business logic and database queries
- `routes/`: defines API endpoints and maps them to controllers
- `models/`: TypeScript classes and interfaces for entities
- `middlewares/`: placeholder for authentication/validation logic
- `index.ts`: main application entry point

### Frontend (`/client`)
- `components/`: reusable UI components (BuyAssetForm, SellAssetForm, PieChart, Navbar)
- `context/`: global auth state management (AuthContext)
- `pages/`: views such as Portfolio, Login, Register, Contact
- `types/`: shared interfaces and type definitions
- `App.tsx`: route configuration
- `index.tsx`: entry point for React application

## Database Tables

- `users`: id, name, email, password
- `assets`: id, name, symbol, price
- `holdings`: id, user_id, asset_id, quantity
- `transactions`: id, user_id, asset_id, type (buy/sell), quantity, price, created_at

## API Overview

- `POST /api/auth/register`: register a new user
- `POST /api/auth/login`: log in
- `GET /api/holdings/:userId`: get user's portfolio
- `POST /api/holdings`: buy asset
- `POST /api/holdings/sell`: sell asset

## How It Works

- When a user buys an asset, the backend checks if it already exists in their portfolio. If yes, the quantity is increased. If no, a new record is inserted.
- When selling, the system validates whether the user owns enough of the asset. If so, it reduces the quantity or deletes the asset if none remain.
- Each transaction is logged in the `transactions` table.
- The frontend dynamically loads and renders the updated portfolio data, including a pie chart showing distribution.
- Authenticated routes are protected using a custom `PrivateRoute` component.

## Running the Project Locally

### Prerequisites
- Node.js
- MySQL
- npm


# Backend setup
```
cd server
npm install
npm run dev
```
### Frontend setup
```
cd ../client
npm install
npm start