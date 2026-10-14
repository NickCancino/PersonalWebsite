# Nicolas Cancino — Portfolio

A responsive portfolio with React and TypeScript components for the curved photo hero and animated link footer. The rest of the page retains its HTML, CSS, project dialogs, and navigation.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

`npm run build` checks TypeScript and builds the site into `dist`. Vercel uses the checked-in build settings in `vercel.json`.

## Components and styles

- `components/ui/tilted-grid-hero.tsx`: reusable curved image row, with ResizeObserver sizing, automatic image cycling, and reduced-motion support.
- `components/ui/demo.tsx`: portfolio-specific hero content and photos.
- `src/main.tsx`: mounts the two React sections.
- `src/styles.css`: Tailwind and shared theme tokens.
- `stylesheet.css`: existing portfolio styles and component layouts.
- `lib/utils.ts`: shadcn-compatible `cn` utility.
- `public/`: runtime photo, project, and résumé assets.

The `@/` alias points to the project root. `components/ui` keeps reusable primitives in a predictable place and matches the aliases in `components.json`. React, TypeScript, Tailwind, and the shadcn configuration are already set up; no separate setup steps are needed. Additional shadcn components can be installed with `npx shadcn@latest add <component>`.

The hero photo row moves automatically without navigation controls. The link footer uses Motion and Lucide icons. Both components respect `prefers-reduced-motion: reduce`.

The footer uses `motion/react` for staggered entry animations and `lucide-react` for icons. The deployment installs dependencies before running the TypeScript check and Vite build.
