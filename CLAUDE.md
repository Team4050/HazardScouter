# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun run dev          # Start Vite dev server with HMR
bun run build        # Full build: generate-routes → tsc → vite build
bun run check        # Biome format + lint (use before commits)
bun run preview      # Preview production build locally
```

**Important:** Routes are auto-generated. If you add/modify files in `src/routes/`, run `bun run generate-routes` or the full build.

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** bundler with **TanStack Router** (file-based routing)
- **SignalDB** with MaverickJS signals for reactive local storage persistence
- **TanStack Form** + **Valibot** for form validation
- **Tailwind CSS** + **Radix UI** (shadcn/ui style)
- **Biome** for formatting/linting (not Prettier/ESLint)
- **PWA** with offline-first architecture

## Architecture

### Data Flow

```
User Input → TanStack Form → Valibot Validation → SignalDB → Local Storage
                                    ↓
                            AppContext (phase validity tracking)
```

### Year-Specific Game Schemas

FRC game rules change yearly. Schema files are organized by year:

- `src/data/match/2025.ts` - Current year game schemas (Auto, Teleop, EndGame)
- `src/data/match/2024.ts` - Previous year (archived)
- `src/data/match/shared.ts` - Schemas that persist across years (PreMatch, TeamReview)
- `src/data/match/index.ts` - Re-exports current year + shared

To switch years, change the export in `index.ts`:
```ts
export * from "@/data/match/2025";  // ← Change this year
```

### Scouting Phases

Matches flow through 5 phases: `preMatch` → `auto` → `teleop` → `endgame` → `postMatch`

Each phase has:
- Schema with Valibot validation (`*Schema`)
- Default values (`*Defaults`)
- Form component in `src/components/form/`

### File-Based Routing

Routes map directly to `src/routes/` file structure:
- `$matchId` = dynamic segment
- `.lazy.tsx` = code-split chunk
- `route.tsx` = parent layout
- `routeTree.gen.ts` = **auto-generated, do not edit**

### Form Pattern

The `useForm` hook (`src/hooks/useForm.tsx`) wraps TanStack Form with:
- Valibot schema validation
- Debounced auto-save to SignalDB (300ms)
- Phase validity tracking via AppContext

### Database

SignalDB collection in `src/data/db.ts`:
- Persists to Local Storage key `hs-matches`
- Fine-grained reactivity via MaverickJS signals
- Export matches to JSON with `downloadMatches()`

## Key Patterns

### Input Components

Custom inputs in `src/components/inputs.tsx` wrap Radix UI:
- `Counter` - Increment/decrement number input
- `Switch`, `Select`, `Slider`, `Textarea`

### Styling

- Dark theme only, CSS variables in `src/styles/globals.css`
- Mobile breakpoint: 600px (`sm:`), tablet breakpoint: 1000px (`md:`)
- Use `cn()` utility for conditional classes

### Path Aliases

`@/*` resolves to `src/*` (configured in tsconfig and vite)
