# Job Board Backend API

This is the backend for the Job Board Platform, built with Django and Django REST Framework.

## Features

- **Job Posting Management**: CRUD operations for jobs and categories.
- **Role-Based Authentication**: JWT authentication for Admins and Users.
- **Optimized Job Search**: Filtering by category, location, type, and experience level.
- **Applications**: Users can apply for jobs.
- **API Documentation**: Swagger UI integrated.

## Technologies

- Python 3.13
- Django 5.0+
- Django REST Framework
- PostgreSQL (Ready) / SQLite (Default)
- JWT (SimpleJWT)
- Swagger (drf-yasg)

## Setup Instructions

1.  **Clone the repository** (if not already done).
2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
3.  **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Linux/Mac
    source venv/bin/activate
    ```
4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run migrations**:
    ```bash
    python manage.py migrate
    ```
6.  **Create a superuser (Admin)**:
    ```bash
    python manage.py createsuperuser
    ```
7.  **Run the development server**:
    ```bash
    python manage.py runserver
    ```

## API Documentation

Once the server is running, access the API documentation at:
- **Swagger UI**: [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
- **ReDoc**: [http://127.0.0.1:8000/api/redoc/](http://127.0.0.1:8000/api/redoc/)

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user (role: 'user' or 'admin')
- `POST /api/auth/token/` - Login (Get Access & Refresh Tokens)
- `POST /api/auth/token/refresh/` - Refresh Access Token

### Jobs
- `GET /api/jobs/` - List all jobs (Filterable)
- `POST /api/jobs/` - Create a job (Admin only)
- `GET /api/jobs/{id}/` - Get job details
- `PUT/PATCH /api/jobs/{id}/` - Update job (Admin/Owner only)
- `DELETE /api/jobs/{id}/` - Delete job (Admin/Owner only)

### Categories
- `GET /api/categories/` - List categories
- `POST /api/categories/` - Create category (Admin only)

### Applications
- `POST /api/applications/` - Apply for a job (Authenticated users)
- `GET /api/applications/` - List applications (User sees own, Admin sees all)
