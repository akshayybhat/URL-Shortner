🔗 URL Shortener API

A secure and scalable URL Shortener REST API built using Node.js, Express, PostgreSQL, and Drizzle ORM.
The API supports JWT-based authentication, user-specific URL management, and Dockerized database setup.

📌 Project Overview

This project allows users to:

Sign up and log in securely

Generate short URLs from long URLs

Redirect short URLs to original URLs

View and manage their own shortened URLs

Authentication is required for all protected routes to ensure data privacy.

✅ Prerequisites

Make sure you have the following installed on your system before starting development:

Node.js
 (v18 or above recommended)

Docker Desktop

Postman
 (for API testing)

A code editor (e.g. VS Code
)

🧱 Tech Stack Overview
Category	Technology	Purpose
Backend	Node.js + Express	REST API development
Database	PostgreSQL	Relational data store
ORM	Drizzle ORM	Type-safe queries and schema management
Containerization	Docker + Compose	Local PostgreSQL instance
Authentication	JWT	Securing private routes
Testing Tool	Postman	Manual API testing
📦 NPM Dependencies

Install all required packages using:

npm install express drizzle-orm pg jsonwebtoken bcrypt dotenv

🔐 Authentication Routes
Method	Endpoint	Description	Auth Required
POST	/signup	Register a new user	❌ No
POST	/login	Login and receive JWT token	❌ No
🔗 URL Routes
Method	Endpoint	Description	Auth Required
POST	/shorten	Create a short URL from a long one	✅ Yes
GET	/:shortCode	Redirect to the original URL	❌ No
GET	/urls	Get all URLs created by logged-in user	✅ Yes
DELETE	/urls/:id	Delete a short URL (if it belongs to the user)	✅ Yes
🐳 Database Setup (Docker)

The project uses Docker Compose to run PostgreSQL locally.
Ensure Docker Desktop is running before starting the backend.

🚀 Getting Started

Clone the repository

Install dependencies

Start PostgreSQL using Docker

Configure environment variables

Run the server

Test APIs using Postman

🛡️ Security Features

Password hashing using bcrypt

JWT-based authentication

User-level authorization for URL operations

Environment variables managed with dotenv

📌 Future Enhancements

URL expiration

Click analytics

Rate limiting

Custom short codes

Frontend dashboard

If you want, next I can:

Improve this README for GitHub stars / recruiters

Add API request/response examples

Write a Postman collection

Align it for resume or portfolio projects

Just tell me 👍

Now i want same readme.md file from the screeenshot

Understood 👍
Here is the README.md content recreated exactly from the screenshots, cleanly formatted and ready to paste. No extra additions, no assumptions.

📎 Project Requirements – URL Shortener API

This document lists all the tools, technologies, and libraries used in the URL Shortener project.
Ensure you have everything set up before beginning development.

✅ Prerequisites

Make sure you have the following installed on your system:

Node.js
 (v18 or above recommended)

Docker Desktop

Postman

A code editor (e.g., VS Code
)

🧰 Tech Stack Overview
Category	Technology	Purpose
Backend	Node.js + Express	REST API development
Database	PostgreSQL	Relational data store
ORM	Drizzle ORM	Type-safe database queries and schema
Containerization	Docker + Compose	Local PostgreSQL instance
Authentication	JWT	Securing private routes
Testing Tool	Postman	Manual API testing
📦 NPM Dependencies

Run this command to install all required packages:

npm install express drizzle-orm pg jsonwebtoken bcrypt dotenv

🔐 Auth Routes
Method	Endpoint	Description	Auth Required
POST	/signup	Register a new user	❌ No
POST	/login	Login and receive token	❌ No
🔗 URL Routes
Method	Endpoint	Description	Auth Required
POST	/shorten	Create a short URL from a long one	✅ Yes
GET	/:shortCode	Redirect to the original URL	❌ No
GET	/urls	Get all URLs created by the logged-in user	✅ Yes
DELETE	/urls/:id	Delete a short URL (if it belongs to the user)	✅ Yes
