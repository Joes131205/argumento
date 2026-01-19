# Argumento

> Master critical thinking, one shift at a time.

Argumento is a gamified educational platform designed to enhance critical thinking and debate skills through interactive simulations. Inspired by **Duolingo** and **Papers, Please!**, players identify logical fallacies, cognitive biases, and media manipulation techniques in real-world-style social media posts.

## Features

### Core Gameplay

- **Daily Shifts**: Time-limited daily challenges where you spot misinformation and fallacies in social posts
- **Practice Mode**: Risk-free unlimited practice to hone your critical thinking skills
- **5 Progressive Campaigns**: Master logical fallacies, cognitive biases, media manipulation, and AI hallucinations
- **Real-World Examples**: Posts designed to mirror actual social media content you encounter daily

### Progression & Rewards

- **XP System**: Earn experience points for correct verdicts and progression
- **Streak Tracking**: Build momentum with daily streaks and track your best personal record
- **Coin Economy**: Accumulate virtual currency to unlock cosmetic themes
- **Post Analytics**: Track all evaluated posts with detailed accuracy statistics and learning insights

### Customization

- **Theme Shop**: Purchase 5+ unique visual themes including Terminal Green, Void White, Amber Orange, Nocturnal Cyan, and Critical Red
- **Active Inventory**: Switch between unlocked themes to match your style

### Analytics & Learning

- **Comprehensive Dashboard**: View total XP, coins, streaks, and posts processed
- **Interactive Manual**: In-game reference guide for all fallacy and bias types with clear definitions

### Social Features

- **Leaderboard**: Compete based on total XP and best streaks
- **User Profiles**: Public profiles showcasing stats and achievements

## Tech Stack

### Frontend (Web Client)

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context
- **PWA**: Progressive Web App support

### Backend (Server)

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth middleware
- **Task Runner**: Turbo monorepo

### Package Manager & Build

- **Package Manager**: Bun (fast, modern JavaScript runtime)
- **Monorepo**: Turbo

## Architecture

This is a **MERN** (MongoDB, Express, React, Node) stack application structured as a monorepo using **Turbo**.

```
argumento/
├── apps/
│   ├── web/          (React frontend with Vite)
│   └── server/       (Express.js backend API)
├── package.json      (Monorepo root)
└── turbo.json        (Build configuration)
```

The frontend communicates with the backend via a RESTful API, while the backend manages all data persistence with MongoDB.

## Get Started

### Prerequisites

- **Node.js** v18 or higher
- **Bun** (fast JavaScript runtime and package manager)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Joes131205/argumento.git
cd argumento
```

2. **Install dependencies**

```bash
bun install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` in both the `apps/server` and `apps/web` directories, then fill in your configuration:

```bash
# Server environment
cp apps/server/.env.example apps/server/.env

# Client environment
cp apps/web/.env.example apps/web/.env
```

4. **Start the development server**

```bash
bun run dev
```

The app will open automatically in your browser. The frontend runs on `http://localhost:3001` and the backend on `http://localhost:3000`.

### Available Scripts

```bash
bun run dev        # Start development servers for all apps
bun run build      # Build the entire monorepo
bun run test       # Run tests
```
