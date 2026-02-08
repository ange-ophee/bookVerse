# BookVerse — Online Book Review Platform

## Project Overview
BookVerse is a full-stack web application that allows users to discover books, add new books, and share reviews and ratings with a community of readers.
The platform encourages reading culture by enabling interaction through reviews, ratings, and user profiles.

This project was developed as part of an academic requirement and demonstrates the practical use of modern web technologies, RESTful APIs, authentication, and documentation using Swagger.


## Objectives
* Provide a centralized platform for book discovery and reviews
* Allow users to register, log in, and manage their profiles
* Enable authenticated users to add books and write reviews
* Display ratings and reviews dynamically
* Secure API endpoints using authentication
* Document the backend API using Swagger


## Technologies Used

### Frontend
* React.js
* JavaScript (ES6)
* HTML5
* CSS3
* Axios
* React Router DOM

### Backend
* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* Swagger (OpenAPI)

## System Architecture

BookVerse follows a **client–server architecture**:
* **Frontend**: React application responsible for UI and user interactions
* **Backend**: RESTful API built with Express.js
* **Database**: MongoDB for persistent storage
* **Authentication**: JWT-based authentication for protected routes


## User Roles & Permissions

### Guest Users
* View books
* View reviews
* Register or log in

### Authenticated Users
* Add new books
* Write reviews and ratings
* View personal profile
* Log out securely

## Key Features
* User authentication (Register / Login / Logout)
* Book listing and details view
* Book addition (protected)
* Review and rating system
* User profile page
* Conditional navigation based on authentication
* Responsive UI
* API documentation with Swagger


## Getting Started

### Prerequisites
Make sure you have the following installed:
* Node.js
* npm
* MongoDB (local or cloud)


## Installation & Setup

### 1 Clone the repository
In your terminal type:

```bash
git clone https://github.com/ange-ophee/bookVerse.git
cd bookverse
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

## API Documentation (Swagger)
Swagger is used to document and test the API endpoints.

Once the backend is running, access Swagger UI at:
```
http://localhost:5000/api-docs
```

Swagger provides:
* List of all endpoints
* Request parameters
* Request body schemas
* Response examples


## Project Structure
```
bookverse/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│
└── README.md
```

## Testing
* Manual testing via browser and Postman
* API testing via Swagger UI
* Authentication and protected routes verified

## Security Measures
* Password hashing
* JWT authentication
* Protected API routes
* CORS configuration

## Future Enhancements
* Book categories and search
* User avatars upload
* Admin role for moderation
* Pagination and filtering
* Likes and favorites system
