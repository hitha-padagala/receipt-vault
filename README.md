# Receipt Vault

Receipt Vault is a receipt management app built with Next.js on the frontend and FastAPI + PostgreSQL on the backend. The app now uses real API calls for authentication, receipt creation, receipt editing, deletion, analytics, and uploaded image display.

## Features

- Email/password registration and login
- JWT-based auth with local token storage
- Dashboard with live receipt stats and charts
- Receipt list with table and grid views
- Receipt detail page with real edit support
- Upload flow that saves receipts to PostgreSQL
- Uploaded image preview and receipt image serving from the backend
- Delete receipts from the UI with confirmation
- Profile page with basic account details
- Settings page and theme switcher

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand
- Recharts
- FastAPI
- SQLAlchemy
- PostgreSQL

## Backend Features

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /receipts`
- `GET /receipts`
- `GET /receipts/{id}`
- `PUT /receipts/{id}`
- `DELETE /receipts/{id}`
- `GET /analytics/summary`
- `GET /health`

Uploaded files are stored locally in `backend/uploads/` and served from `/uploads`.

## Environment Setup

### Frontend

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend

Create `backend/.env` from `backend/.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=receipt_vault
DB_USER=receipt_user
DB_PASSWORD=receipt123
SECRET_KEY=change-me-in-local-dev
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## Getting Started

1. Install frontend dependencies:

```bash
npm install
```

2. Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Start PostgreSQL and create the database/user:

```sql
CREATE DATABASE receipt_vault;
CREATE USER receipt_user WITH PASSWORD 'receipt123';
GRANT ALL PRIVILEGES ON DATABASE receipt_vault TO receipt_user;
```

4. Run the backend:

```bash
uvicorn app.main:app --reload --app-dir backend
```

5. Run the frontend:

```bash
npm run dev
```

6. Open the app:

```text
http://localhost:3000
```
## Key UI Routes

- `/login`
- `/register`
- `/forgot-password`
- `/dashboard`
- `/upload`
- `/receipts`
- `/receipts/[id]`
- `/analytics`
- `/profile`
- `/settings`

## Notes

- Receipts created from the upload page are persisted to PostgreSQL.
- Receipt images are stored on disk and served from the backend so the detail page can display them.
- Receipt editing updates the saved record in the database.
- The old mock-data flow has been replaced by real backend integration.
