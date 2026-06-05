# Smart Receipt & Expense Manager
Smart Receipt & Expense Manager is a local-first receipt and expense management app built with Next.js. It opens directly into a demo workspace and stores all data in `localStorage`.

## Features

- Demo workspace with no login step
- Dashboard with receipt and expense analytics
- Receipt management with preview and filtering
- Expense management with create, edit, duplicate, and delete actions
- Category management with default and custom categories
- Reports with CSV export and print support
- Dark mode, responsive layout, and polished empty states

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand
- Recharts

All app data is stored in the browser using `localStorage`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm run dev
```

3. Open the app:

```text
http://localhost:3000
```

## Key UI Routes

- `/dashboard`
- `/upload`
- `/receipts`
- `/expenses`
- `/categories`
- `/analytics`
- `/reports`
- `/profile`
- `/settings`

## Notes

- Receipts and expenses are persisted in `localStorage`.
- Receipt deletion removes the saved browser record.
- Receipt editing updates the saved browser record.
- The workspace uses a built-in demo dataset that can be extended from the UI.
- 
