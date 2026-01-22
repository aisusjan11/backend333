# Assignment 3 — MongoDB CRUD API (Online Bookstore)

This project upgrades a simple Express backend to use **MongoDB (Mongoose)** and provides a **full CRUD API**.
Topic: **Online Bookstore**.

## Tech Stack
- Node.js + Express
- MongoDB Atlas or Local MongoDB
- Mongoose (schemas + timestamps)
- Joi validation (POST/PUT)
- Simple HTML/JS interface in `public/`

## Objects
### Primary Object: Book
Required fields:
- `title` (string, required)
- `author` (string, required)
- `price` (number, required)
- `category` (string, required)

Also includes timestamps: `createdAt`, `updatedAt`.

### Secondary Object: Order (recommended)
- relationship to Book via `items[].book` (ObjectId ref)
- includes `customerName`, `customerEmail`, `items`, `status`, `totalAmount`

## Setup
1) Install dependencies:
```bash
npm install
```

2) Create `.env` from `.env.example` and set:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

3) Run the server:
```bash
npm run dev
```

Open:
- API health: `http://localhost:3000/api/health`
- Front-end: `http://localhost:3000/`

## API Endpoints

### Books
- POST `/api/books`
- GET `/api/books`
- GET `/api/books/:id`
- PUT `/api/books/:id`
- DELETE `/api/books/:id`

### Orders
- POST `/api/orders`
- GET `/api/orders`
- GET `/api/orders/:id`
- PUT `/api/orders/:id` (status update)
- DELETE `/api/orders/:id`

## Validation & Status Codes
- Validation is applied to POST and PUT requests (400 Bad Request).
- Created resources return 201.
- Not found returns 404.
