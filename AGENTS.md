# Thread Clone - Agent Guidelines

This is a Next.js 16+ App Router project with TypeScript, Tailwind CSS v4, Prisma, and Better Auth.

## Build Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Production
npm run build        # Build for production (next build)
npm run start        # Start production server

# Linting & Formatting
npm run lint         # Run ESLint
npm run check        # Run Biome check (auto-fix)
npm run check2       # Run Biome check --unsafe (more aggressive fixes)
npm run format       # Run Biome format (auto-format)

# Prisma
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema to database
npx prisma studio     # Open Prisma Studio (database GUI)
```

## Code Style Guidelines

### TypeScript
- Use explicit types; avoid `any`
- Interface over type for object shapes
- Use `as const` for literal values where applicable

### Naming Conventions
- **Components**: PascalCase (e.g., `ProfileCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePosts.ts`)
- **Utilities/Server Actions**: camelCase (e.g., `getCurrentUser.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `Post.ts`)
- **Files**: kebab-case for utilities, PascalCase for components

### Imports

**Order (use Biome's auto-organize):**
1. React/Next imports (`import { useState } from "react"`)
2. Next.js imports (`import Link from "next/link"`)
3. External libraries (`import { z } from "zod"`)
4. Internal imports (`import { authClient } from "@/lib/auth-client"`)
5. Relative imports (`import { Avatar } from "@/components/ui/Avatar"`)

Use `@/` alias (configured in tsconfig.json, points to root directory `./`) ### File Organization
```
app/                  # Next.js App Router pages
├── (auth)/          # Auth routes (login, register)
├── (protected)/    # Protected routes (feed, profile)
└── api/            # API routes
components/          # React components
├── general/        # Logo, Sidebar, PostActions
├── ui/             # Avatar, Button, FollowButton
├── feed/           # Feed, FeedPost, Comments
├── modal/          # Modal, CreatePostModal, ProfileModal
├── profile/        # ProfileCard
└── search/         # SearchInput, SearchCard
hooks/              # Custom hooks (usePosts)
lib/                # Prisma, Auth, Cloudinary configs
server-actions/     # Server actions (getCurrentUser, etc.)
services/           # Cloudinary service
store/              # Zustand stores
types/              # TypeScript interfaces
providers/          # QueryProvider
```

**Client Components:**
```tsx
"use client"

import { useState } from "react"

export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false)
  // ...
}
```

### Error Handling
- Use `try/catch` with async operations
- Display errors via `react-hot-toast` (`import toast from "react-hot-toast"`)
- Return `null` or throw specific errors from server actions
- Validate input with Zod where appropriate

### Tailwind CSS v4
- Use `@apply` sparingly in components; prefer utility classes
- Custom colors defined in `app/global.css` under `@theme`
- Available colors: `--color-background`, `--color-surface`, `--color-border`, `--color-text-muted`
- Responsive: `md:`, `lg:` prefixes (mobile-first)

### Database (Prisma)
- Schema: `prisma/schema.prisma`
- Singleton client: `lib/prisma.ts` (use existing, don't create new instances)
- Models: User, Post, Comment, Like, Follow (plus Better Auth tables)

### Authentication (Better Auth)
- Server config: `lib/auth.ts`
- Client config: `lib/auth-client.ts`
- API route: `app/api/auth/[...all]/route.ts`
- Use `authClient` for client-side auth, server actions for server-side

### State Management
- **Zustand**: Global UI state (modals) in `store/`
- **TanStack Query**: Server state + infinite scroll in `hooks/`
- Store: `useModalStore.ts`, `usePostStore.ts`

### File Organization
```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/          # Auth routes (login, register)
│   ├── (protected)/    # Protected routes (feed, profile)
│   └── api/            # API routes
├── components/          # React components
│   ├── general/        # Logo, Sidebar, PostActions
│   ├── ui/             # Avatar, Button, FollowButton
│   ├── feed/           # Feed, FeedPost, Comments
│   ├── modal/          # Modal, CreatePostModal, ProfileModal
│   ├── profile/        # ProfileCard
│   └── search/         # SearchInput, SearchCard
├── hooks/              # Custom hooks (usePosts)
├── lib/                # Prisma, Auth, Cloudinary configs
├── server-actions/     # Server actions (getCurrentUser, etc.)
├── services/           # Cloudinary service
├── store/              # Zustand stores
├── types/              # TypeScript interfaces
└── providers/          # QueryProvider
```

### Important Notes

- **Next.js 16**: Not the version you know. Check `node_modules/next/dist/docs/` before using APIs
- **.params**: Always `await` params (they are promises in Next.js 16)
- **Images**: Add domains to `next.config.ts` for external images (Cloudinary)
- **Build**: `pnpm run build` does NOT run Prisma generate - run separately if needed
- **Environment**: Requires `.env` with DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, CLOUDINARY_*

### Running Tests

No test framework configured. To add tests, install Vitest or Jest first.