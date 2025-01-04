# BABEL FORGE - Server

## Overview
The **BabelForge Server** provides backend services for project and task management, user authentication, notifications, and more, ensuring seamless collaboration.

## Features
- User Authentication (JWT-based)
- Project & Task Management APIs
- Notifications & Real-time Updates
- Comments & File Uploads
- Search & Filters
- Issue Tracking & Reporting

## Tech Stack
- Node.js, Express.js
- MongoDB
- JWT, Multer
- Socket.IO (Optional)

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/younusFoysal/BabelForge-Server.git
   cd BabelForge-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=<your_mongo_url>
   JWT_SECRET=<your_secret_key>
   ```
4. Start the server:
   ```bash
   npm run start
   ```



