# Doctor Tracker Frontend

Web interface for the Doctor Tracker application. It provides login, protected dashboard views, doctor management, patient management, and dashboard analytics.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Browser Fetch API

## Features

- Cookie-based authentication and session checks
- Protected dashboard layout
- Doctor listing, creation, editing, deletion, filtering, and pagination
- Patient listing, editing, deletion, filtering, and pagination
- Patient assignment and unassignment
- Dashboard overview cards and charts
- Guest login and authenticated layouts

## Project Structure

```text
frontend/
|-- src/app/
|   |-- page.js                 # Redirects to login
|   |-- auth/login/            # Login page
|   `-- dashboard/
|       |-- dashboard/         # Dashboard overview
|       |-- doctors/           # Doctor management
|       |-- patients/          # Patient management
|       `-- layout.js          # Protected dashboard layout
|-- src/components/ui/         # Reusable UI helpers
|-- src/contexts/AuthContext.js
|-- src/layouts/               # Guest and protected layouts
|-- src/services/              # API service modules
|-- src/shared/                # Header, footer, and sidebar
|-- src/data/                  # Static fallback data
|-- public/                    # Static assets
|-- .env.local                 # Local environment variables
|-- package.json
`-- next.config.mjs
```

## Prerequisites

- Node.js 18 or newer
- npm
- The Doctor Tracker backend running

## Environment Variables

Create or update `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

`NEXT_PUBLIC_API_URL` is required. API requests include credentials so that authentication cookies are sent and received.

## Installation

```bash
cd frontend
npm install
```

## Running the App

Start the backend first, then run:

```bash
npm run dev
```

Open `http://localhost:3000`.

The root route redirects to `/auth/login`.

## Production Build

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_API_URL` to the deployed backend API URL before building.
