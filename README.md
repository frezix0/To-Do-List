# To-Do List

A simple and stylish To-Do List application built with [Vue.js](https://vuejs.org/). Manage your daily tasks with ease and keep track of what needs to be done!

## Features

- ✅ Add, edit, and delete tasks
- 📋 Mark tasks as complete or incomplete
- 🌙 Clean and responsive user interface
- 💾 Data persistence (tasks stay saved between visits)
- 🔍 Filter and organize your tasks

## Tech Stack
- ✅ **Vue.js**
- ✅ **TailwindCSS**
- ✅ **TypeScript**

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone Repository

```bash
git clone https://github.com/frezix0/To-Do-List.git
```

### 2. Install Depedencies

```bash
npm install
```

### 3. Usage

```bash
npm run dev
```

Your app will be running at [http://localhost:5173](http://localhost:5173).

## Project Structure
```
src/
├── components/
│   ├── TodoForm.vue           # Form input todo
│   ├── TodoList.vue           # List tampilan todos
│   ├── TodoItem.vue           # Single todo item
│   ├── Stats.vue              # Statistic cards
│   ├── Calendar.vue           # Calendar view
│   └── Sidebar.vue            # Sidebar navigation
├── composables/
│   ├── useTodoStorage.ts      # Logic localStorage & CRUD
│   ├── useTodoFilter.ts       # Logic filtering todos
│   ├── useCalendar.ts         # Logic kalender
│   └── useDatetime.ts         # Real-time datetime
├── types/
│   └── todo.ts                # TypeScript interfaces
├── utils/
│   ├── dateUtils.ts           # Date formatting & utilities
│   ├── storageUtils.ts        # Storage helper functions
│   └── constants.ts           # Constants & enums
├── styles/
│   ├── main.css               # Global styles
│   ├── components.css         # Component-specific styles
│   ├── calendar.css           # Calendar styles
│   └── responsive.css         # Responsive & media queries
├── App.vue                    # Main app component
├── main.ts                    # Entry point
└── README.md                  # Project documentation
```