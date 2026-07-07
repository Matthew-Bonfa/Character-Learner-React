# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Here are the commonly used commands for development:

- **Development server**: `npm run dev`  
  Starts the Vite development server with hot module replacement (HMR) at `http://localhost:5173` (or as specified by Vite).

- **Build for production**: `npm run build`  
  Runs TypeScript compilation (`tsc -b`) followed by Vite's production build.

- **Preview production build**: `npm run preview`  
  Serves the built application locally for previewing.

- **Lint code**: `npm run lint`  
  Runs ESLint on the entire project using the configuration in `eslint.config.js`.

Note: There are no test scripts configured in this project.

## Project Structure

### Root Directory
- `src/` - Contains all source code
- `public/` - Static assets (if any, not shown in initial listing)
- `index.html` - Entry HTML file
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration
- `eslint.config.js` - ESLint configuration

### Source Code (`src/`)

#### Components (`src/components/`)
- Reusable UI components used throughout the application.
- Key components:
  - `GlobalProvider.tsx`: React context provider managing global state (user content, user settings, and associated functions).
  - `NavBar.tsx`: Navigation bar for switching between main views.
  - `Question.tsx`, `TextInput.tsx`: Core components for the learning interface in the main page.
  - Various UI components like buttons, toggles, alerts, and SVG elements.

#### Pages (`src/pages/`)
- Represent the main views of the application, controlled by `PageContainer`.
- `MainPage.tsx`: The primary learning interface where users practice Kana/Kanji to Romaji/English translation.
- `ContentPage.php`: Interface for managing user-uploaded content (CSV files) and viewing favorite content.
- `SettingsPage.tsx`: User settings panel (toggled via the navigation bar).
- `PopularContent.tsx`: Placeholder for popular content (currently empty).
- `PageContainer.tsx`: Manages the current page state and renders the appropriate page component.

#### State Management
- Global state is managed via React Context (`GlobalProvider.tsx`).
- The context provides:
  - `userContent`: Array of content objects (each with name, content array, selected, liked flags).
  - `userSettings`: Object containing UI preferences (dark mode, display/write modes, order mode, etc.).
  - `globalFunctions`: Functions to modify the state (add/remove/update content, toggle settings, etc.).
- State updates are handled via a reducer (`userContentReducer`) for content and individual state setters for settings.

#### Utilities (`src/utils.tsx`)
- `parseCSV`: Function to parse uploaded CSV files into the expected content format (using PapaParse and Wanakana for Romaji conversion).
- `useToggleState`: Custom hook for toggling boolean states.
- `generateNum`: Utility for generating random numbers (used for content sequencing) with shuffle and random modes.
- `hexToRGB`: Utility for converting hex color values to RGB strings.
- `shuffleArray`: Fisher-Yates shuffle algorithm implementation.

#### Styling
- Styled-components is used for styling (`styled-components` and `@emotion/react` dependencies).
- Theme configuration is defined in `constants.tsx` (`darkTheme` and `lightTheme` objects).
- The `ThemeProvider` from `styled-components` wraps the application in `GlobalProvider`.

#### Constants (`src/constants.tsx`)
- Contains:
  - Color theme definitions (dark and light).
  - Page type definitions (`PageType`: "main", "content", "popularContent").
  - Data format interfaces (`csvFormat`, `UserInformation`).
  - Animation variants for Framer Motion.

### Key Data Flows
1. **Content Management**: Users upload CSV files via `ContentPage` → parsed by `parseCSV` → added to global state via `addContent` function → stored in `userContent`.
2. **Learning Flow**: `MainPage` consumes selected content from `userContent` (filtered by `selected` flag) and presents items in either random or shuffle order based on `orderMode` setting.
3. **Settings**: Toggles in `SettingsPage` update context state via `globalFunctions`, which immediately affect the UI due to context consumption.

### Important Notes
- The application uses Vite as its build tool and development server.
- TypeScript is used throughout for type safety.
- Styling is primarily handled via styled-components with theme support.
- Content persistence is currently client-side only (state is lost on refresh; no backend persistence is implemented).
- The application focuses on language learning (Japanese Kana/Kanji to Romaji/English translation).