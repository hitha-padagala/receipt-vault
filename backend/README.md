# Receipt Vault Backend

Local FastAPI backend for the Receipt Vault frontend.

## Stack

- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- JWT auth
- Local file uploads
- Static image serving for uploaded receipts

## Setup

1. Copy `.env.example` to `.env` and adjust your local PostgreSQL values.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run migrations:

```bash
alembic upgrade head
```

4. Start the API:

```bash
uvicorn app.main:app --reload --app-dir backend
```

## API

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

## Notes

- Receipt uploads are stored locally in `backend/uploads/`.
- Uploaded images are served from `/uploads/<filename>`.
- Receipt edits update the existing record in PostgreSQL.
- OCR text is accepted and stored, but OCR extraction itself is still client-provided or optional.
