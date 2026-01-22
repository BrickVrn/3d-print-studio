# AGENTS.md — Development Guide for Agentic Coding

This file contains essential information for AI coding agents working in this repository.

## Project Overview

**3D Print Studio** — Full-stack application with Next.js 14 frontend and Express backend.
- Frontend: Next.js App Router, TypeScript, Tailwind CSS, Three.js
- Backend: Express, TypeScript, PostgreSQL with Knex.js, JWT auth

---

## Build / Lint / Test Commands

### Frontend (./frontend)
```bash
cd frontend
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend (./backend)
```bash
cd backend
npm run dev          # Start development server with ts-node-dev (localhost:5000)
npm run build        # Build TypeScript to dist/
npm start            # Start production server
```

### Single Test
No test framework is currently configured. Tests should be added with Jest or Vitest.

---

## Code Style Guidelines

### Imports & Modules
- Frontend: Use `@/` alias for absolute imports from src/
- Backend: Use relative imports within src/
- Named exports preferred, default exports for components/pages
- Group imports: external libs, internal modules, types

```ts
// Frontend
import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';

// Backend
import express, { Request, Response } from 'express';
import { db } from '../lib/db';
import { authController } from '../controllers/auth';
```

### Formatting
- 2 spaces indentation
- Single quotes
- No trailing whitespace
- NO comments unless explicitly requested
- Max line length: 100 (soft limit)

### TypeScript
- Strict mode enabled (tsconfig.json)
- Use interfaces for object shapes, types for unions/primitives
- Avoid `any` — use `unknown` or proper types
- Type functions explicitly when return type is not obvious

### Naming Conventions
- Components: PascalCase (e.g., `HeroSection`, `Button`)
- Functions/Variables: camelCase (e.g., `getUser`, `isLoading`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_FILES`)
- Files: PascalCase for components, camelCase for utilities
- Types/Interfaces: PascalCase

### React/Next.js Patterns
- Use `'use client'` directive for client components
- Server components by default (App Router)
- Prefer `async/await` over Promises
- Use `generateMetadata` for SEO
- Use `generateStaticParams` for dynamic routes

### Error Handling
- Use try-catch for async operations
- Return consistent error responses: `{ error: string }`
- Log errors with context

```ts
async function handler(req: Request, res: Response) {
  try {
    const result = await someOperation();
    res.json(result);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Validation
- Use Zod schemas for request validation
- Export inferred types for TypeScript

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  description: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Database (Knex.js)
- Use async/await with Knex queries
- Chain query builders for readability
- Use `.returning()` for inserts

```ts
const user = await db('users')
  .where('email', email)
  .select('id', 'email', 'name')
  .first();

await db('orders')
  .insert({ ...data })
  .returning('*');
```

### Authentication
- JWT with access (15min) and refresh (7d) tokens
- Bearer token in Authorization header
- Use `authMiddleware` for protected routes
- Use `adminOnly` for admin-only endpoints

```ts
import { authMiddleware, adminOnly } from '../middleware/auth';

router.get('/protected', authMiddleware, handler);
router.delete('/users/:id', authMiddleware, adminOnly, handler);
```

### Styling (Tailwind CSS)
- Use utility classes from Tailwind
- Custom colors: `text-accent`, `bg-accent`
- Dark mode: `dark:text-white`, `dark:bg-gray-900`
- Use `cn()` utility for conditional classes

```tsx
import { cn } from '@/lib/utils';

<button className={cn(
  'px-4 py-2 rounded-lg',
  isActive && 'bg-accent text-white',
  className
)}>
  Click me
</button>
```

### API Responses
- Success: `200` with JSON data or `201` for created
- Client errors: `400`, `401`, `403`, `404`
- Server errors: `500`
- Pagination: use `limit` and `offset` query params

---

## Architecture Notes

### Directory Structure
```
frontend/src/
  app/              # Next.js App Router pages
  components/ui/    # Reusable UI components
  components/hero/  # Hero section
  components/layout/# Layout components
  components/quiz/  # Quiz components
  lib/              # Utilities, API, schemas
  hooks/            # Custom hooks
  contexts/         # React contexts

backend/src/
  routes/           # Express route definitions
  controllers/      # Business logic
  middleware/       # Auth, error handling
  lib/              # Database config
  migrations/       # Knex migrations
```

### Environment Variables
Copy `.env.example` to `.env` before starting.
Frontend uses `NEXT_PUBLIC_` prefix for client-accessible vars.

---

## Important Notes
- Russian is the primary UI language
- NO comments in code unless requested
- Always run `npm run lint` after changes (frontend)
- Follow existing patterns for new features
- Check existing files before creating new ones
