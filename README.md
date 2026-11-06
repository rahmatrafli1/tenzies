# Tenzies

A simple dice game built with React and Vite. Roll the dice, freeze the ones you want to keep, and try to make all 10 dice show the same number.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
- [Accessibility](#accessibility)

## Features

- 10 dice, each showing a random value from 1 to 6
- Click a die to hold or unhold it
- Held dice keep their value when you roll again
- Win detection when all dice are held and show the same value
- Confetti animation when you win
- "New Game" button to restart after winning
- Accessible markup: ARIA labels, a live region for the win announcement, and automatic focus on the button after winning

## Tech Stack

| Technology                                                          | Purpose                   |
| ------------------------------------------------------------------- | ------------------------- |
| [React](https://react.dev/) (19 RC)                                 | UI library                |
| [Vite](https://vitejs.dev/)                                         | Dev server and build tool |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | React support for Vite    |
| [nanoid](https://github.com/ai/nanoid)                              | Unique IDs for each die   |
| [react-confetti](https://github.com/alampros/react-confetti)        | Win celebration effect    |
| Google Fonts (Karla)                                                | Typography                |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (a current LTS version is recommended)
- npm

### Installation

```bash
git clone https://github.com/rahmatrafli1/tenzies.git
cd tenzies
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Available Scripts

| Command                     | Description                          |
| --------------------------- | ------------------------------------ |
| `npm start` / `npm run dev` | Start the Vite development server    |
| `npm run build`             | Create a production build            |
| `npm run preview`           | Preview the production build locally |

## How to Play

1. Click **Roll** to roll all the dice.
2. Click a die to **hold** it at its current value. Held dice turn green.
3. Click **Roll** again. Only the dice you have not held change.
4. Click a held die again to release it.
5. Win by holding all 10 dice when they all show the same number.
6. Click **New Game** to play again.

## Project Structure

```
Tenzies/
├── components/
│   └── Die.jsx        # A single die button
├── App.jsx            # Main game component and logic
├── index.jsx          # React entry point
├── index.html         # HTML template
├── index.css          # Global styles
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```

## Implementation Details

### `index.jsx`

Mounts `<App />` into the `#root` element inside `React.StrictMode` and loads the global stylesheet.

### `App.jsx`

Holds all of the game state and logic.

**State**

- `dice` is an array of 10 objects with this shape:

  ```js
  { id: string, value: number, isHeld: boolean }
  ```

  It is initialized lazily with `useState(() => generateAllNewDice())`.

**Derived value**

- `gameWon` is `true` when every die is held and every die has the same value as the first die.

**Functions**

| Function               | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `generateAllNewDice()` | Creates 10 dice with random values (1–6), `isHeld: false`, and a unique `nanoid` ID       |
| `rollDice()`           | If the game is won, starts a new game. Otherwise re-rolls only the dice that are not held |
| `hold(id)`             | Toggles `isHeld` for the die with the given ID                                            |

**Effects and refs**

- `buttonRef` and `useEffect` move focus to the Roll/New Game button when `gameWon` becomes `true`, so keyboard users can start a new game right away.
- `<Confetti />` renders only while `gameWon` is `true`.

### `components/Die.jsx`

A presentational component that renders one die as a `<button>`.

| Prop     | Type       | Description                                                              |
| -------- | ---------- | ------------------------------------------------------------------------ |
| `value`  | `number`   | The number shown on the die (1–6)                                        |
| `isHeld` | `boolean`  | Whether the die is frozen. Held dice have a green background (`#59E391`) |
| `hold`   | `function` | Click handler that toggles the held state                                |

## Accessibility

- Each die is a real `<button>` with `aria-pressed` reflecting its held state.
- Each die has a descriptive `aria-label`, for example "Die with value 4, held".
- A visually hidden `aria-live="polite"` region announces the win message to screen readers.
- Focus moves automatically to the action button when the game is won.

## Credits

This project is based on the Tenzies project from the [Scrimba](https://scrimba.com/) Learn React course.
