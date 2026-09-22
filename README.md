# Task Manager

A full-stack task management application built with **React + TypeScript** on the frontend and **ASP.NET Core (.NET 8)** on the backend.

The project was developed as a technical assignment, with a focus on clean structure, separation of responsibilities, validation, error handling, and a simple user experience.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Axios
* Formik + Yup
* SCSS
* ESLint

### Backend

* ASP.NET Core / .NET 8
* Controllers
* Dependency Injection
* DTOs
* Data Annotations validation
* Middleware
* `CancellationToken`
* Built-in `ILogger`
* In-memory data storage

---

## Features

### Authentication

* Login with username and password
* Client-side form validation
* Server-side credential validation
* Dummy authentication token
* Authentication state managed with React Context
* Authentication persisted in `sessionStorage`
* Protected `/tasks` route
* Axios automatically attaches the authentication token to API requests

### Tasks

* Load tasks from the backend
* Display the logged-in username
* Mark tasks as completed/open
* Add new tasks
* Filter tasks:

  * All
  * Open
  * Completed
* Loading state
* Empty state
* API error state with Retry
* Per-task update state
* Daily goal with progress bar

---

## Project Structure

task-test/
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── types/
│
└── backend/
    ├── Controllers/
    ├── DTOs/
    ├── Models/
    ├── Services/
    ├── Middleware/
    ├── Configuration/
    ├── Program.cs
    └── appsettings.json

### Frontend Architecture

* **Pages** – application screens such as Login and Tasks.
* **Components** – reusable UI components.
* **Hooks** – application logic, including task loading and updates.
* **Services** – API communication through Axios.
* **Context** – authentication state.
* **Types** – shared TypeScript models and types.

### Backend Architecture

The backend follows a simple layered structure:

Controller
    ↓
Service
    ↓
In-memory data

Controllers are responsible for HTTP concerns, while services contain the application logic.

---

## API

### Login

POST /api/auth/login

Request:

{
  "username": "admin",
  "password": "123456"
}

Successful response:

{
  "username": "admin",
  "token": "dummy-token"
}

Invalid credentials return:
401 Unauthorized

### Get Tasks

GET /api/tasks

### Create Task

POST /api/tasks

Request:

{
  "title": "New task"
}

### Update Task

PATCH /api/tasks/{id}

Request:

{
  "isCompleted": true
}

Invalid task IDs return:

404 Not Found

---

## Validation

Task creation validates the task title:

* Required
* Maximum length: 100 characters

The backend uses ASP.NET Core model validation through Data Annotations and `[ApiController]`.

Invalid request data results in:

400 Bad Request

---

## Error Handling

The backend includes global exception handling middleware.

Unexpected server errors are:

* Logged using the built-in ASP.NET Core `ILogger`
* Returned to the client as a generic error
* Associated with a Correlation ID for troubleshooting

Example response:

{
  "error": "An unexpected error occurred.",
  "correlationId": "..."
}

The Correlation ID is also returned through the:

X-Correlation-Id

response header.

---

## Configuration

Authentication credentials are not stored directly in the source code.

Local configuration is provided through environment variables using a `.env` file.

Example:

Authentication__Username=admin
Authentication__Password=123456

The actual `.env` file should not be committed to Git.

A `.env.example` file is included as a template.

---

## Running the Project

### Backend

From the `backend` directory:

dotnet restore
dotnet run

The backend will start on the configured HTTP/HTTPS ports.

### Frontend

From the `frontend` directory:

npm install
npm run dev

The frontend runs by default on:

http://localhost:5173

The frontend API URL is configured through:

VITE_API_BASE_URL=https://localhost:<PORT>/api


After changing a Vite environment variable, restart the development server.

---

## Test Credentials

For local development:

Username: admin
Password: 123456

These credentials are provided through local environment configuration and are intended only for the assignment.

---

## Quality Checks

Before submitting the project:

npm run build


Backend:
dotnet build


---

## Design Decisions

### Why Axios?

Axios provides a centralized HTTP client and makes it easy to add common request behavior, such as automatically attaching the authentication token.

### Why React Context?

Authentication state is shared between multiple parts of the application, such as the login page and protected routes. React Context provides a simple solution without introducing Redux for a relatively small application.

### Why an in-memory backend?

The assignment explicitly requires server-side data to be stored in memory, so no database was introduced.

### Why a Service layer?

Controllers focus on HTTP requests and responses, while services contain application logic. This keeps responsibilities separated and makes the code easier to extend.

### Why `CancellationToken`?

The token is passed through request-processing layers so that long-running or cancellable operations can be cancelled when the client disconnects or the request is aborted. This is especially useful when replacing the in-memory implementation with a database or external API in a real application.

---

## Notes

This project intentionally keeps authentication simple because the assignment allows a dummy token. A production application would typically use a real authentication mechanism such as JWT or an external identity provider, together with server-side authorization.
