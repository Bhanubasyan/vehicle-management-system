# 🚗 Intelligent Inventory Dashboard

A full-stack web application designed to help dealership managers monitor vehicle inventory, identify aging stock, and take data-driven actions.



## 📌 Features

* 🔐 User Authentication (Login / Signup)
* 📊 Inventory Dashboard with charts
* 🔍 Search, Filter, and Sorting functionality
* ⏳ Aging Stock Identification (vehicles older than 90 days)
* ✏️ Update vehicle status (e.g., Price Reduction)
* 👤 Profile Section with user details
* 🌙 Dark Mode support


## 🛠️ Tech Stack

### Frontend

* React.js
* CSS / Tailwind (if used)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Deployment

* Render (Backend)
* (Add your frontend link here: Vercel / Netlify)



## 🧱 System Architecture

The application follows a client-server architecture:

* Frontend communicates with backend APIs
* Backend handles business logic and database operations
* MongoDB stores user and vehicle data



## 🚀 Live Demo

* 🌐 Frontend: https://inventory-dasboard.onrender.com/
* 🔗 Backend API: https://vehicle-management-system-r3mq.onrender.com



## ⚙️ Installation & Setup

### 1. Clone the repository


git clone https://github.com/Bhanubasyan/vehicle-management-system.git
cd your-repo-name

### 2. Setup Backend

cd backend
npm install
npm start


### 3. Setup Frontend

cd frontend
npm install
npm start

## 🔑 Environment Variables

Create a `.env` file in backend:


MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key

## 📂 API Endpoints

### Authentication

* POST `/signup`
* POST `/login`

### Inventory

* GET `/items`
* POST `/items`
* PUT `/items/:id`
* DELETE `/items/:id`



## 🤖 AI Collaboration

I used ChatGPT as an AI assistant for:

* Generating initial project structure
* Debugging backend issues
* Improving UI logic and features

### Verification Process

* Tested APIs manually
* Verified frontend-backend integration
* Debugged and fixed issues independently



## 🚧 Future Improvements

* JWT Authentication
* Role-based access control
* Real-time updates (WebSockets)
* Advanced analytics dashboard



## 📄 License

This project is created as part of a technical assessment.


## 🙋‍♂️ Author

**Bhanu **
