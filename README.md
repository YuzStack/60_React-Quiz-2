# 🧠 The React Quiz | Advanced State Machine

![React Quiz Desktop View](/1_react-quiz-desktop-view.png)

**The React Quiz** is an intensive exploration of complex state management using the `useReducer` hook. Moving beyond simple state, this application implements a robust "State Machine" architecture to handle a multi-stage quiz experience with precision and performance.

**[Live Preview](https://yuzstack-react-quiz-2.netlify.app/)**

## 🛠️ The Architectural Approach: `useReducer`

The core of this application is a centralized reducer function that manages eight different state variables. By shifting logic from components to the reducer, I ensured:

- **Predictable Transitions**: The app strictly follows defined statuses: `loading` → `ready` → `active` → `finished`.
- **Complex Logic Decoupling**: Calculating points, updating high scores, and managing a synchronized timer are all handled in a single, testable function.
- **Derived State**: State variables like `secsRemaining` are calculated based on the number of questions, ensuring a dynamic experience every time.

## 🌟 Key Features

- **Dynamic Timer**: A custom-built countdown timer integrated directly into the reducer state.
- **Real-time Scoring**: Instant feedback on answers with a weighted point system.
- **Persistent Highscore**: Tracking personal bests across quiz restarts.
- **Progress Tracking**: A custom progress bar that monitors current position and score accumulation.

## 👨🏾‍💻 Technical Challenges Overcome

- **Simulating Real-World APIs**: Utilized `json-server` during development to mimic asynchronous data fetching patterns.
- **State Reset Patterns**: Implemented a `restartQuiz` action that intelligently resets the quiz state while preserving the high score and the fetched question bank.
- **Timing Accuracy**: Managed the "ticking" of the timer through a `useEffect` that dispatches actions to the reducer every second.

## 🚀 Getting Started

To run this project locally:

1. Clone the repository: `git clone https://github.com/YuzStack/57_Memory-Game.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
