# Study Planner API

A REST API for user authentication, profile management, and task management built with **Node.js, Express, Prisma, and PostgreSQL**.

The API provides JWT-based authentication, password hashing, user-specific task access, task ownership authorization, pagination, input validation, centralized error handling, rate limiting, Helmet security headers, and CORS.

---

## Features

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected user and task routes
- User profile retrieval, update, and deletion
- Task creation, retrieval, update, and deletion
- User-specific task access
- Task ownership authorization
- Pagination for task listing
- Input validation
- Centralized error handling
- Rate limiting for authentication endpoints
- Helmet security middleware
- CORS support
- PostgreSQL database with Prisma ORM

---

## Tech Stack

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| Node.js            | JavaScript runtime            |
| Express 5          | REST API framework            |
| PostgreSQL         | Relational database           |
| Prisma 7           | ORM and database access       |
| JWT                | Authentication                |
| bcrypt             | Password hashing              |
| Helmet             | HTTP security headers         |
| express-rate-limit | Rate limiting                 |
| CORS               | Cross-origin request handling |
| Nodemon            | Development server            |

---

## Project Structure

```text
Study Planner/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimiterMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── services/
│   │   ├── authServices.js
│   │   ├── taskServices.js
│   │   └── userServices.js
│   │
│   ├── utils/
│   │   ├── appError.js
│   │   └── asyncHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
├── package-lock.json
└── prisma.config.ts
```

---

# Setup

## 1. Install dependencies

After cloning the repository, install the dependencies:

```bash
npm install
```

---

## 2. Environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

### Variables

| Variable       | Description                         |
| -------------- | ----------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string        |
| `JWT_SECRET`   | Secret used to sign and verify JWTs |
| `PORT`         | Port used by the Express server     |

**Important:** Never commit your real `.env` file, database credentials, or JWT secret to GitHub.

---

## 3. Set up the database

The project uses Prisma with PostgreSQL.

Apply the existing migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

The project uses Prisma's PostgreSQL driver adapter (`@prisma/adapter-pg`) to connect Prisma to PostgreSQL.

---

## 4. Start the development server

```bash
npm run dev
```

The development script starts:

```text
node ./src/server.js
```

through Nodemon and loads the `.env` file.

The server runs on the port specified by `PORT`.

---

# API Documentation

## Base URL

For local development, if the server is configured with port `5000`:

```text
http://localhost:5000
```

The API is divided into three main route groups:

```text
/auth
/user
/tasks
```

---

# Authentication

Authentication endpoints are available under:

```text
/auth
```

Authentication uses **JSON Web Tokens (JWT)**.

After a successful login, the API returns a token valid for **1 hour**.

Protected endpoints require the token in the `Authorization` header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Register User

### Endpoint

```http
POST /auth/register
```

Creates a new user.

### Request Body

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

### Validation

The registration endpoint checks that:

- `name` is provided
- `email` is provided
- `password` is provided
- Email has a valid format
- Password is at least 8 characters long
- Email is not already registered

### Success Response

**Status:** `201 Created`

```json
{
  "message": "User created successfully."
}
```

### Possible Errors

#### Missing fields

**Status:** `400 Bad Request`

```json
{
  "error": "Please enter all the details."
}
```

#### Invalid email

**Status:** `400 Bad Request`

```json
{
  "error": "Please enter a valid email."
}
```

#### Password too short

**Status:** `400 Bad Request`

```json
{
  "error": "Password must be atleast 8 characters long."
}
```

#### Email already exists

**Status:** `409 Conflict`

```json
{
  "error": "User with the same email already exists."
}
```

---

## Login

### Endpoint

```http
POST /auth/login
```

Authenticates an existing user.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Successfully logged in.",
  "token": "YOUR_JWT_TOKEN"
}
```

The returned JWT contains the authenticated user's ID and expires after 1 hour.

### Invalid Credentials

**Status:** `401 Unauthorized`

```json
{
  "error": "Invalid Email or Password."
}
```

or:

```json
{
  "error": "Invalid email or password!"
}
```

---

# User API

User endpoints are available under:

```text
/user
```

All user endpoints are protected by JWT authentication.

Include:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Get Profile

### Endpoint

```http
GET /user/profile
```

Returns the profile of the authenticated user.

### Success Response

**Status:** `200 OK`

```json
{
  "user": {
    "id": "user-uuid",
    "name": "User Name",
    "email": "user@example.com",
    "createdAt": "2026-08-27T10:00:00.000Z",
    "updatedAt": "2026-08-27T10:00:00.000Z"
  }
}
```

The password is not returned.

---

## Update Profile

### Endpoint

```http
PUT /user/profile
```

Updates the authenticated user's profile.

### Request Body

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

The service updates the authenticated user identified by the JWT.

### Success Response

**Status:** `200 OK`

```json
{
  "user": {
    "id": "user-uuid",
    "name": "Updated Name",
    "email": "updated@example.com",
    "createdAt": "2026-08-27T10:00:00.000Z",
    "updatedAt": "2026-08-30T10:00:00.000Z"
  }
}
```

---

## Delete Profile

### Endpoint

```http
DELETE /user/profile
```

Deletes the authenticated user's account.

### Success Response

**Status:** `200 OK`

```json
{
  "message": "User deleted successfully."
}
```

---

# Task API

Task endpoints are available under:

```text
/tasks
```

All task endpoints require authentication.

Users can only retrieve, update, or delete tasks associated with their own user ID.

---

## Create Task

### Endpoint

```http
POST /tasks/create
```

Creates a new task for the authenticated user.

### Request Body

```json
{
  "title": "Complete API documentation",
  "description": "Write the README for the API"
}
```

### Validation

The title is required and cannot be empty or contain only whitespace.

### Success Response

**Status:** `201 Created`

```json
{
  "message": "Task created successfully.",
  "task": {
    "id": "task-uuid",
    "title": "Complete API documentation",
    "description": "Write the README for the API",
    "completed": false,
    "userId": "user-uuid",
    "createdAt": "2026-08-30T10:00:00.000Z",
    "updatedAt": "2026-08-30T10:00:00.000Z"
  }
}
```

`completed` defaults to `false`.

---

## Get All Tasks

### Endpoint

```http
GET /tasks/
```

Returns tasks belonging to the authenticated user.

### Pagination

The endpoint supports the following query parameters:

| Parameter | Default | Description              |
| --------- | ------: | ------------------------ |
| `page`    |     `1` | Page number              |
| `limit`   |    `10` | Number of tasks per page |

Example:

```http
GET /tasks/?page=1&limit=10
```

The maximum allowed `limit` is `50`.

### Success Response

**Status:** `200 OK`

```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "title": "Complete API documentation",
      "description": "Write the README for the API",
      "completed": false,
      "userId": "user-uuid",
      "createdAt": "2026-08-30T10:00:00.000Z",
      "updatedAt": "2026-08-30T10:00:00.000Z"
    }
  ],
  "pagination": {
    "pages": 1,
    "limit": 10,
    "totTasks": 1,
    "totalPages": 1
  }
}
```

### Pagination Validation

`page` and `limit` must be positive integers.

If they are invalid:

**Status:** `400 Bad Request`

```json
{
  "error": "Page and limit must be positive integers."
}
```

If `limit` is greater than `50`:

**Status:** `400 Bad Request`

```json
{
  "error": "Page Limit cannot be greater that 50!"
}
```

---

## Get Task By ID

### Endpoint

```http
GET /tasks/:id
```

Returns a specific task belonging to the authenticated user.

Example:

```http
GET /tasks/123e4567-e89b-12d3-a456-426614174000
```

### Success Response

**Status:** `200 OK`

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Complete API documentation",
  "description": "Write the README for the API",
  "completed": false,
  "userId": "user-uuid",
  "createdAt": "2026-08-30T10:00:00.000Z",
  "updatedAt": "2026-08-30T10:00:00.000Z"
}
```

### Task Not Found

**Status:** `404 Not Found`

```json
{
  "error": "Task not found!"
}
```

A task belonging to another user is also not returned.

---

## Update Task

### Endpoint

```http
PATCH /tasks/:id
```

Updates one or more properties of a task.

### Request Body

Any combination of the supported fields can be supplied:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Supported Fields

| Field         | Type    | Description       |
| ------------- | ------- | ----------------- |
| `title`       | String  | Task title        |
| `description` | String  | Task description  |
| `completed`   | Boolean | Completion status |

### Validation

- `title` cannot be empty or whitespace-only
- `completed` must be a boolean
- At least one field must be supplied

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Task updated successfully."
}
```

### No Update Data

**Status:** `400 Bad Request`

```json
{
  "error": "Please provide something to update."
}
```

### Invalid Completed Value

**Status:** `400 Bad Request`

```json
{
  "error": "Completed must be a boolean."
}
```

### Task Not Found

**Status:** `404 Not Found`

```json
{
  "error": "Task not found!"
}
```

---

## Delete Task

### Endpoint

```http
DELETE /tasks/:id
```

Deletes a task belonging to the authenticated user.

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Task deleted successfully."
}
```

### Task Not Found

**Status:** `404 Not Found`

```json
{
  "error": "Task not found!"
}
```

---

# Authorization

The API uses both **authentication** and **resource ownership authorization**.

## Authentication

The `authMiddleware`:

1. Reads the `Authorization` header.
2. Checks that the format is `Bearer <token>`.
3. Verifies the JWT using `JWT_SECRET`.
4. Extracts the user's ID.
5. Stores the ID in:

```js
req.userId;
```

Protected controllers use this ID to identify the authenticated user.

---

## Authorization

Task queries are scoped to the authenticated user's ID.

For example, retrieving a task uses both:

```text
userId
id
```

This prevents one authenticated user from accessing another user's tasks.

The same ownership check is used for task updates and deletions.

---

# Security

## Password Hashing

User passwords are hashed using bcrypt before being stored in PostgreSQL.

Plain-text passwords are not stored in the database.

---

## JWT

JWT is used to authenticate protected requests.

Tokens are signed using:

```text
JWT_SECRET
```

and expire after:

```text
1 hour
```

---

## Helmet

Helmet is enabled globally:

```js
app.use(helmet());
```

It adds security-related HTTP headers to responses.

---

## CORS

CORS is enabled for the API:

```js
app.use(cors());
```

---

## Rate Limiting

Authentication routes use rate limiting.

### Login

The login endpoint allows:

```text
5 requests per 15 minutes
```

After exceeding the limit:

```json
{
  "error": "Too many login attempts. Please try again later!"
}
```

### Registration

The registration endpoint allows:

```text
10 requests per 15 minutes
```

After exceeding the limit:

```json
{
  "error": "Too many requests. Please try again later."
}
```

---

# Error Handling

The API uses a centralized error-handling middleware.

Errors created with `AppError` contain:

- Error message
- HTTP status code

The centralized middleware returns errors in this format:

```json
{
  "error": "Error message"
}
```

If an error does not specify a status code, the API returns:

```text
500 Internal Server Error
```

---

# HTTP Status Codes

| Status Code | Meaning                            |
| ----------: | ---------------------------------- |
|       `200` | Request successful                 |
|       `201` | Resource created                   |
|       `400` | Invalid request or input           |
|       `401` | Authentication required or invalid |
|       `404` | Resource not found                 |
|       `409` | Resource conflict                  |
|       `429` | Rate limit exceeded                |
|       `500` | Internal server error              |

---

# Database Schema

The application contains two main models:

```text
User
 │
 └── Task
```

## User

```text
id
name
email
password
createdAt
updatedAt
```

The user ID is generated as a UUID and the email is unique.

---

## Task

```text
id
title
description
completed
userId
createdAt
updatedAt
```

Each task belongs to one user through `userId`.

The default value of `completed` is:

```text
false
```

---

# API Request Flow

A protected request follows this general flow:

```text
Client
  │
  │  Authorization: Bearer <JWT>
  ▼
Route
  │
  ▼
Authentication Middleware
  │
  ├── Verify JWT
  └── Set req.userId
  │
  ▼
Controller
  │
  ├── Validate input
  │
  ▼
Service
  │
  ▼
Prisma
  │
  ▼
PostgreSQL
  │
  ▼
Response
```

---

# Architecture

The backend follows a layered architecture:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Prisma
   ↓
PostgreSQL
```

### Routes

Define endpoints and attach middleware.

### Controllers

Handle HTTP requests, validate input, and send responses.

### Services

Contain database operations and application logic.

### Middleware

Handles authentication, rate limiting, and centralized errors.

### Utils

Contains reusable utilities such as `AppError` and `asyncHandler`.

### Prisma

Provides type-safe database access to PostgreSQL.

---

# Testing

The API can be tested using tools such as **Requestly**, Postman, Insomnia, or Thunder Client.

Recommended testing sequence:

1. Register a user.
2. Login with the registered credentials.
3. Copy the returned JWT.
4. Add the token to the `Authorization` header.
5. Get the user profile.
6. Update the profile.
7. Create a task.
8. Get all tasks.
9. Get a task by ID.
10. Update the task.
11. Delete the task.
12. Test requests without a token.
13. Test an invalid/expired token.
14. Test invalid input.
15. Test pagination.
16. Test task ownership by attempting to access a task belonging to another user.
17. Test authentication rate limits.

---

# Example Authorization Header

For protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Do not include quotation marks around the token.

---

# Available Endpoints

| Method   | Endpoint         | Auth | Description           |
| -------- | ---------------- | :--: | --------------------- |
| `POST`   | `/auth/register` |  ❌  | Register a user       |
| `POST`   | `/auth/login`    |  ❌  | Login and receive JWT |
| `GET`    | `/user/profile`  |  ✅  | Get profile           |
| `PUT`    | `/user/profile`  |  ✅  | Update profile        |
| `DELETE` | `/user/profile`  |  ✅  | Delete profile        |
| `POST`   | `/tasks/create`  |  ✅  | Create task           |
| `GET`    | `/tasks/`        |  ✅  | Get user's tasks      |
| `GET`    | `/tasks/:id`     |  ✅  | Get a task            |
| `PATCH`  | `/tasks/:id`     |  ✅  | Update a task         |
| `DELETE` | `/tasks/:id`     |  ✅  | Delete a task         |

---

# Author

ABUZAR ANSARI

Built with Node.js, Express, Prisma, and PostgreSQL.
