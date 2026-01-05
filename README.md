# 📎 Project Requirements – URL Shortener API

This document lists all the tools, technologies, and libraries used in the **URL Shortener API** project.  
Ensure you have everything set up before beginning development.

---

## ✅ Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or above recommended)
- **Docker Desktop**
- **Postman**
- A code editor (e.g. **VS Code**)

---

## 🧰 Tech Stack Overview

| Category           | Technology          | Purpose                                   |
|--------------------|---------------------|--------------------------------------------|
| Backend            | Node.js + Express   | REST API development                       |
| Database           | PostgreSQL          | Relational data store                      |
| ORM                | Drizzle ORM         | Type-safe database queries and schema      |
| Containerization   | Docker + Compose    | Local PostgreSQL instance                  |
| Authentication     | JWT                 | Securing private routes                    |
| Testing Tool       | Postman             | Manual API testing                         |

---

## 📦 NPM Dependencies

Run this command to install all required packages:

```bash
npm install express drizzle-orm pg jsonwebtoken bcrypt dotenv
