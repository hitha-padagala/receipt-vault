# Receipt Vault

Receipt Vault is a modern SaaS-style frontend for managing digital receipts and invoices. It is built as a Next.js 15 App Router application with TypeScript, Tailwind CSS, shadcn/ui-style primitives, Recharts, and Lucide icons.

## What’s Included

- Authentication pages
- Dashboard with summary cards and charts
- Upload receipt experience
- Receipts list with table and card views
- Receipt detail view
- Analytics dashboard
- Settings page
- Dark/light mode support
- Mock data only, no backend yet

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
- next-themes

## Demo Login

Use these mock credentials to enter the dashboard:

- Email: `demo@receiptvault.com`
- Password: `demo1234`

## Routes

- `/login`
- `/register`
- `/forgot-password`
- `/dashboard`
- `/upload`
- `/receipts`
- `/receipts/[id]`
- `/analytics`
- `/settings`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Project Structure

- `src/app` - App Router pages and layouts
- `src/components` - Reusable UI and feature components
- `src/data` - Mock JSON-style data
- `src/lib` - Utility helpers

## Notes

- This project is frontend-only right now.
- Form handling and navigation are mocked for demo purposes.
- Backend authentication, uploads, and persistence can be added later without changing the UI structure much.
