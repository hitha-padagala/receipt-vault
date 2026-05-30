# Receipt Vault
Receipt Vault is a receipt management app built with Next.js on the frontend and FastAPI + PostgreSQL on the backend. The app now uses real API calls for authentication, receipt creation, receipt editing, deletion, analytics, and uploaded image display.

## Features

- Email/password registration and login
- JWT-based auth with local token storage
- Dashboard with live receipt stats and charts
- Receipt list with table and grid views
- Receipt detail page with real edit support
- Upload flow that saves receipt metadata to PostgreSQL and images to Cloudinary
- Uploaded image preview and receipt image display from Cloudinary URLs
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

Uploaded receipt images are stored in Cloudinary, while receipt metadata stays in PostgreSQL.

## Environment Setup

### Frontend

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend

Create `backend/.env` from `backend/.env.example`:

```env
DATABASE_URL=postgresql+psycopg://receipt_user:receipt123@localhost:5432/receipt_vault
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET_KEY=change-me-in-local-dev
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALGORITHM=HS256
CLOUDINARY_FOLDER=receipt-vault/receipts
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

4. Run database migrations:

```bash
alembic upgrade head
```

5. Run the backend:

```bash
uvicorn app.main:app --reload --app-dir backend
```

6. Run the frontend:

```bash
npm run dev
```

7. Open the app:

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

- Receipts created from the upload page are persisted to PostgreSQL and their images are uploaded to Cloudinary.
- Receipt deletion removes the Cloudinary image as well as the database row.
- Receipt editing updates the saved record in the database.
- The old mock-data flow has been replaced by real backend integration.
