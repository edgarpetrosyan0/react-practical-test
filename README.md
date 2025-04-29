# React Practical Test

This is a technical interview test app built with React and TypeScript. The goal is to evaluate the ability to identify and resolve bugs, improve code structure, and implement features based on existing `TODO` comments.

## 🛠️ Stack

- React
- TypeScript
- SCSS Modules
- Redux Toolkit

## 📦 Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/GagikTunanyan/react-practical-test.git
cd react-practical-test
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

## 🌐 Backend Integration

To simulate a real-world backend during development, you can choose one of the following:

- ✅ **Use [https://reqres.in](https://reqres.in)** — A free public API for mock authentication and user data.

- ✅ **Create custom mock API responses** using local `.json` files and simulate HTTP requests with `Promise`-based functions (e.g., with `setTimeout`).

In both approaches:

- Use **Axios** for all HTTP requests.
- Configure **Axios interceptors** to handle:
  - Adding auth tokens to headers
  - Handling errors globally
- Follow **RESTful API conventions**, such as:
  - `GET /users`
  - `POST /login`
  - `GET /users/:id`

> 📌 **Note**: Do not mix both options — use either the public API or your own mock backend for consistency.


## 🧪 What to Focus On

The codebase includes various `TODO` comments throughout the app that highlight:

- 🐛 Bugs that need fixing
- 🎯 Missing or incomplete features
- 🧹 Code that could be optimized or refactored
- 🌐 Potential improvements for accessibility or UX

This project is intentionally left in an incomplete state to simulate real-world problem-solving scenarios during technical interviews.

## 📁 Structure

```
react-practical-test/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── store/          # Global state using Redux Toolkit
│   ├── pages/          # Application pages (e.g., Home)
│   └── App.tsx         # Root component
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## 💡 Notes

- No external UI libraries are used to encourage implementation from scratch.
- You are encouraged to follow clean code principles and separation of concerns.
- Performance and user experience improvements are welcome.

## 📝 License

MIT License