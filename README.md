# Ayojon Frontend

Ayojon is an event discovery and management platform. The frontend
provides the user interface for browsing events, viewing event details,
creating and managing events, joining events, and switching between
light and dark themes.

## Features

-   Responsive landing page with featured, upcoming, and past events
-   Browse events by category
-   Search and filter events
-   Event details pages
-   User authentication with Better Auth
-   Create events and manage events created by the signed-in user
-   Join events and view joined events
-   Edit and delete managed events
-   Light and dark theme support
-   Toast notifications for user feedback

## Tech Stack

-   [Next.js](https://nextjs.org/) (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Lucide React
-   Better Auth
-   next-themes
-   Sonner
-   Express API (separate backend)

## Getting Started

### Prerequisites

-   Node.js (use a current LTS release)
-   npm
-   The Ayojon backend running locally or a deployed backend URL

### 1. Clone the repository

``` bash
git clone <your-frontend-repository-url>
cd <frontend-project-folder>
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the frontend project root:

``` env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Set `NEXT_PUBLIC_API_URL` to your deployed backend URL when using a
hosted API. Do not put private secrets in variables prefixed with
`NEXT_PUBLIC_`; these values are exposed to the browser.

Configure Better Auth using the environment variables required by your
own Better Auth client/server setup. Keep secret values out of source
control.

### 4. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 5. Create a production build

``` bash
npm run build
npm run start
```

## Backend Connection

The frontend communicates with the separate Express backend through
`NEXT_PUBLIC_API_URL`.

The API routes used by the application include:

  Method     Endpoint                  Purpose
  ---------- ------------------------- -----------------------------------
  `GET`      `/events/upcoming`        Retrieve upcoming events
  `GET`      `/events/past`            Retrieve past events
  `GET`      `/event/:id`              Retrieve one event
  `POST`     `/event`                  Create an event
  `PATCH`    `/event/:id`              Update an event
  `DELETE`   `/event/:id`              Delete an event
  `GET`      `/categories`             Retrieve event categories
  `GET`      `/category/:id`           Retrieve one category
  `POST`     `/category`               Create a category
  `GET`      `/my-events/:email`       Retrieve events created by a user
  `POST`     `/join-event`             Join an event
  `GET`      `/joined-events/:email`   Retrieve a user's joined events
  `DELETE`   `/joined-events/:id`      Cancel a joined-event record

The exact routes available may vary as the backend evolves. Check the
backend README and route definitions for the current API contract.

## Project Structure

A simplified overview of the application:

``` text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── events/
│   │   └── [id]/
│   ├── manage-events/
│   └── ...
├── components/
│   ├── Event/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── auth.ts
│   └── auth-client.ts
└── types/
```

Your actual folder structure may contain additional routes and
components.

## Development Notes

-   Keep interactive components marked with `"use client"` only when
    they need client-side state, effects, event handlers, or browser
    APIs.
-   Client Components must not be declared as `async`. Fetch data in a
    Server Component or inside an effect in a Client Component.
-   Use `router.refresh()` when a successful client-side mutation needs
    the current Server Components to fetch fresh data.
-   External image hosts used with `next/image` must be configured in
    `next.config.ts`.
-   Event dates are intended to be handled consistently using the
    `Asia/Dhaka` timezone where date boundaries matter.

## Available Scripts

The following are standard Next.js scripts. Confirm the exact names in
`package.json`:

  Command           Description
  ----------------- --------------------------------------
  `npm run dev`     Start the local development server
  `npm run build`   Build the application for production
  `npm run start`   Run the production build
  `npm run lint`    Run linting, if configured

## Contributing

1.  Create a feature branch.
2.  Make focused changes and test the affected pages and API flows.
3.  Check the browser console and terminal for errors.
4.  Open a pull request with a clear description of the changes.

## License

Add your project's license information here.
