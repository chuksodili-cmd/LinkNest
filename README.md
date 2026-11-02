# LinkNest 🌐

**LinkNest** is a full-stack link-in-bio application that allows users to create a personal public page and organize all their important social media links in one place.

## ✨ Features

- User registration and login
- Secure password hashing
- JWT-based authentication
- Create and edit personal profiles
- Add, edit, and delete social media links
- Public profile pages with unique usernames
- Responsive user dashboard
- PostgreSQL database integration

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- bcrypt
- JSON Web Tokens (JWT)

## 📁 Project Structure

```text
LinkNest/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── middleware/
│       ├── routes/
│       └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       └── app/
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/chuksodili-cmd/LinkNest.git
cd LinkNest
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and configure your database connection and JWT secret.

Example:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
PORT=4000
```

Do not share or upload your real environment variables.

### 3. Set up the database

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Start the backend

```bash
npm run dev
```

The backend runs at:

`http://localhost:4000`

### 5. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

`http://localhost:3000`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/users/me` | Get logged-in user |
| POST | `/api/profiles` | Create profile |
| GET | `/api/profiles/me` | Get personal profile |
| PUT | `/api/profiles/me` | Update profile |
| GET | `/api/profiles/public/:username` | Get public profile |
| POST | `/api/links` | Create a link |
| GET | `/api/links` | Get user links |
| PUT | `/api/links/:id` | Update a link |
| DELETE | `/api/links/:id` | Delete a link |

## 🎯 Project Goal

The goal of LinkNest is to provide a simple way for creators, professionals, and individuals to share their online presence through one public page.

## 👨‍💻 Author

Created as a full-stack web development project.

