# Task Manager - MERN Stack Application

A full-stack task management application with JWT authentication and CRUD operations.

## Features
- User authentication (Register/Login/Logout)
- Create, Read, Update, Delete tasks
- Task filtering by status (To Do, In Progress, Done)
- Search tasks by title
- Responsive UI
- Form validation
- JWT authentication
- Protected routes

## Tech Stack
**Frontend:**
- React.js
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Heroicons

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Express Validator

## Prerequisites
- Node.js (v18+)
- MongoDB (v6+)
- npm (v9+)

## Setup Instructions

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/Shankar2580/TaskManagement.git
   cd task-manager/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. Start the application
   ```bash
   npm start
   ```

## API Documentation

### Base URL
`http://localhost:3001/api`

### Authentication

#### Register User
```http
POST /auth/register
```
**Request Body:**
```json
{
  "username": "test",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Logout User
```http
POST /auth/logout
```
**Headers:**
```json
{
  "x-auth-token": "your_jwt_token"
}
```

### Tasks

#### Get All Tasks
```http
GET /tasks
```
**Query Parameters:**
- `status` (optional): Filter by status (to_do, in_progress, done)
- `search` (optional): Search by title

**Headers:**
```json
{
  "x-auth-token": "your_jwt_token"
}
```

#### Create Task
```http
POST /tasks
```
**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the MERN stack task manager",
  "status": "to_do",
  "dueDate": "2024-12-31"
}
```

#### Update Task
```http
PUT /tasks/:id
```
**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in_progress",
  "dueDate": "2024-12-31"
}
```

#### Delete Task
```http
DELETE /tasks/:id
```

### Response Formats

**Success Response:**
```json
{
  "status": "success",
  "data": {...}
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description"
}
```