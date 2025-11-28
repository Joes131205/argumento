# HospiGo

Thx to [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)

## Features

-   **TypeScript** - For type safety and improved developer experience
-   **TanStack Router** - File-based routing with full type safety
-   **TailwindCSS** - Utility-first CSS for rapid UI development
-   **shadcn/ui** - Reusable UI components
-   **Express** - Fast, unopinionated web framework
-   **Bun** - Runtime environment
-   **Mongoose** - TypeScript-first ORM
-   **MongoDB** - Database engine
-   **Biome** - Linting and formatting
-   **PWA** - Progressive Web App support
-   **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

Please install bun first, thx

## Database Setup

This project uses MongoDB with Mongoose.

1. Make sure you have MongoDB set up.
2. Update your `apps/server/.env` file with your MongoDB connection URI.

3. Apply the schema to your database:

```bash
bun db:push
```

Then, run the development server:

```bash
bun dev
```

Using 3000 and 3001 port, 3001 for frontend, 3000 for backend
Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
hospigo/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Express)
```

## Available Scripts

-   `bun dev`: Start all applications in development mode
-   `bun build`: Build all applications
-   `bun dev:web`: Start only the web application
-   `bun dev:server`: Start only the server
-   `bun check-types`: Check TypeScript types across all apps
-   `bun db:push`: Push schema changes to database
-   `bun db:studio`: Open database studio UI
-   `bun check`: Run Biome formatting and linting
-   `cd apps/web && bun generate-pwa-assets`: Generate PWA assets
