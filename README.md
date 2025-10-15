# To-Do List

<<<<<<< HEAD
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
=======
A simple and stylish To-Do List application built with Vue.js and CSS. Organize your tasks, track your progress, and stay productive!

## Features

- 📝 Add, edit, and delete tasks
- ✅ Mark tasks as completed
- 🎨 Clean and responsive user interface
- 🗂️ Organize your daily or project tasks
- 💾 Persistent storage (local storage or backend integration)
- 🔍 Filter tasks (e.g., all, completed, active)

## Tech Stack

- **Frontend**: [Vue.js](https://vuejs.org/)
- **Styling**: CSS
- **TypeScript**: Used for type safety
- **HTML**: Markup structure

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/frezix0/To-Do-List.git
   cd To-Do-List
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

```bash
npm run serve
# or
yarn serve
```

Visit [http://localhost:8080](http://localhost:8080) to view the app in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Folder Structure

```
├── src/
│   ├── assets/        # Images, icons, etc.
│   ├── components/    # Vue components
│   ├── views/         # View pages
│   ├── App.vue        # Root component
│   └── main.ts        # Application entry point
├── public/
├── package.json
├── README.md
```

## Customization

- Edit styles in the `src/assets` or component-specific CSS files.
- Add new features or tweak existing ones by editing Vue components in `src/components/`.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT License

---

Made with ❤️ by [frezix0](https://github.com/frezix0)
>>>>>>> c19bcb295056bbd9d8c88451c62bd9a885f3801a
