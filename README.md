# Event Hub

Event Hub is a modern web application that allows users to create, browse, and join events seamlessly. It features user authentication, event management, and real-time filtering with a clean UI powered by React and a robust backend powered by Node.js and MongoDB.

---

## 📂 Repositories

- **Client:** [Event-Hub (React Client)](https://github.com/Tanim-Ahmmed/Event-Hub)  
- **Server:** [Event-Hub-Server (Node.js Backend)](https://github.com/Tanim-Ahmmed/Event-Hub-Server)

---

## 🛠️ Tech Stack

### Client

- React 18 (with Hooks & Context API)
- React Router v6 for routing
- React Query for data fetching & caching
- Tailwind CSS for styling
- Axios for HTTP requests
- SweetAlert2 for notifications
- date-fns for date filtering and manipulation

### Server

- Node.js with Express.js
- MongoDB Atlas (via official MongoDB Node driver)
- bcrypt for password hashing
- CORS for cross-origin requests

---

## 🚀 Features

- **User Authentication:** Register & login with secure password hashing.
- **Event Management:** Create, update, delete events.
- **Event Browsing:** Search, filter by date (today, this week, last week, etc.).
- **Join Events:** Users can join events and track attendee count.
- **Responsive UI:** Mobile-friendly and accessible.
- **Protected Routes:** Private routes for authenticated users only.

---

## 📝 Client Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Tanim-Ahmmed/Event-Hub.git
   cd Event-Hub
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   Create a `.env` file and add your API URL:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser at `http://localhost:5173`

---

## 📝 Server Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Tanim-Ahmmed/Event-Hub-Server.git
   cd Event-Hub-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The API will run on `http://localhost:5000`

---

## 🔗 API Endpoints Overview

| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| POST   | `/register`        | Register a new user            |
| POST   | `/login`           | Authenticate user login       |
| GET    | `/users`           | Get all users                 |
| POST   | `/events`          | Create a new event            |
| GET    | `/events`          | Get all events (with search) |
| POST   | `/events/:id/join` | Join an event                 |
| PUT    | `/events/:id`      | Update an event              |
| DELETE | `/events/:id`      | Delete an event              |

---

## 📸 Screenshots

*(You can add your UI screenshots here with Markdown image syntax)*

---

## 🧩 Client Architecture Highlights

- The app uses **React Router v6** for nested routing and protected routes.
- State management is mostly via React Hooks and Context API for authentication.
- Data fetching and caching with **React Query** enhances UX and performance.
- Filters and search inputs allow dynamic event filtering using `date-fns`.

---

## 💡 Usage Notes

- Make sure the backend server is running before starting the client to avoid API errors.
- User email is required to join events (used to prevent duplicate joining).
- Passwords are securely hashed with bcrypt before storage.
- The UI uses Tailwind CSS for rapid styling and responsiveness.

---

## 🤝 Contribution

Contributions are welcome! Please open issues or pull requests if you want to improve the project.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by modern event management applications.
- Thanks to the open-source community for React, Express, MongoDB, and related libraries.


## 🔗 API Endpoints Overview

Here’s a summary of the key backend API routes provided by the Event Hub Server:

### 👥 User Routes

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| POST   | `/register`  | Register a new user       |
| POST   | `/login`     | Log in an existing user   |
| GET    | `/users`     | Retrieve all user data    |

### 📅 Event Routes

| Method | Endpoint             | Description                                 |
|--------|----------------------|---------------------------------------------|
| GET    | `/events`            | Fetch all events (supports search query)    |
| POST   | `/events`            | Create a new event                          |
| POST   | `/events/:id/join`   | Join an event by ID                         |
| PUT    | `/events/:id`        | Update an existing event by ID              |
| DELETE | `/events/:id`        | Delete an event by ID                       |

#### 🔍 Optional Query Parameters for `/events`:
- `search`: Filter events by title (case-insensitive)

---

✅ Most routes respond with appropriate status codes and messages for success or failure.
🔐 Authentication required for event creation, update, deletion, and joining.
