# Scriber Landing Page

The official landing page for Scriber

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Theme**: Dark/Light mode support


## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page in your browser.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
  - `/ui` - shadcn/ui components
  - `/backgrounds` - Background effect components
  - `/theme` - Theme provider and toggle
- `/lib` - Utility functions
- `/hooks` - Custom React hooks
- `/public` - Static assets

## Deployment

| Command                           | Action                                       |
| :-------------------------------- | :------------------------------------------- |
| `bun run build`                   | Build your production site                   |
| `bun run preview`                 | Preview your build locally, before deploying |
| `bun run build && bun run deploy` | Deploy your production site to Cloudflare    |

## Vercel Roundabout

- refactor: update font imports and modify hero section text
