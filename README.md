# Book Library Management (LibManager)

A simple Library Management web app built with **React + Vite**, styled using **Tailwind CSS**, with **Zustand** for state management and **React Router** for navigation.

---

## Abstract (250 words)

LibManager is a lightweight web application for managing a small library’s book inventory and basic circulation status. The project demonstrates a modular, feature-first React architecture using Vite for tooling, Tailwind CSS for styling, Zustand for global state, and React Router for navigation. Users can view a directory of books, search by title or author, add new entries through a modal form, delete books, and toggle availability between Available and Borrowed. The interface is designed for fast interaction: filtering happens client-side, state updates are immutable, and components are organized into reusable UI atoms (buttons, cards, modals), layout primitives (sidebar, main outlet), and feature modules (books, users). The store layer centralizes actions such as addBook, deleteBook, setSearchQuery, and toggleStatus, enabling predictable updates and straightforward testing. The implementation emphasizes clarity and maintainability: routes are declarative, icons are provided via lucide-react, and utilities encapsulate formatting and validation. Although the current dataset is mocked for startup, the architecture is prepared for future integration with an API and persistent storage. This report documents the problem background, design decisions, implementation approach, results, and potential enhancements including authentication, role-based access, server-side search, and analytics dashboards. A sidebar layout separates navigation from content, while the book table uses badges and action icons for status changes. Performance considerations include memoized filtering, debounced input hooks, and rerenders through stable handlers. Error handling and validation rules prevent empty fields and duplicate titles. The project serves as a practical baseline for demonstrations of state management, component composition, and UI consistency in front‑end development.

---

## 1. Introduction

Managing book inventories manually (registers/spreadsheets) is error-prone and time-consuming, especially when tracking availability (Borrowed/Available) and performing quick searches. LibManager addresses this by providing a small, focused UI for:

- Viewing a book directory
- Searching by **title** or **author**
- Adding and removing books
- Updating circulation status (Borrow/Return)

**Objectives**
- Build a clean UI with consistent layout and reusable components.
- Implement predictable global state using a lightweight state manager.
- Provide feature-first project structure for scalability.

---

## 2. Design of Product / Process / Algorithm

### 2.1 Product Architecture (Feature-First + Atomic UI)

Project structure:

```text
/src
  App.jsx
  App.css
  main.jsx
  index.css
  /assets
  /components
    /ui        (Atomic UI components)
      Button.jsx
    /layout    (Layout shell)
      Layout.jsx
  /features
    /books
      BookList.jsx
      BookForm.jsx
    /users
      (empty - future)
  /hooks
    useDebounce.js
  /store
    useLibraryStore.js
  /utils
    formatters.js
    validators.js
```

**Key idea:** UI primitives live in `/components/ui`, while domain logic and screens live under `/features`.

**Note:** Files like `Card.jsx`, `Modal.jsx`, `BookDetails.jsx`, `Login.jsx`, and `UserList.jsx` are planned for future scope but are not created yet in the current workspace.

### 2.2 State Management (Zustand)

Global state is handled by `src/store/useLibraryStore.js`:

- **State**
  - `books`: list of book objects
  - `searchQuery`: current search text
- **Actions**
  - `setSearchQuery(query)`
  - `addBook(book)`
  - `deleteBook(id)`
  - `toggleStatus(id)` → switches `Available` ↔ `Borrowed`

A mock dataset is used as initial data; IDs are created with `Date.now()` for simplicity.

### 2.3 Routing + Layout Process

- `Layout.jsx` defines a persistent sidebar + main content outlet.
- `App.jsx` sets up routes using React Router.
- Active route highlighting uses `useLocation()` to apply styles.

### 2.4 Algorithm / UI Logic (Search + Filter + Actions)

**Filtering algorithm (client-side):**
- Convert query, title, and author to lowercase
- Match query via `includes()` on title or author
- Render the filtered list
- If no results, show an empty-state message

**Actions:**
- Toggle status button calls `toggleStatus(book.id)`
- Delete button calls `deleteBook(book.id)`
- Add button opens modal (form integration can be extended with React Hook Form)

---

## 3. Results and Discussion

### 3.1 Results (What Works)

- Sidebar layout stays consistent across routes.
- Book Directory displays a table of records with:
  - Title, Author, Status badge
  - Action buttons (Borrow/Return, Delete)
- Search updates results in real-time.
- Status updates immediately and visually (badge color changes).

### 3.2 Discussion (Observations / Limitations)

- Current data is **in-memory** (refresh resets to mock data).
- `Date.now()` IDs are fine for demos, but a backend/UUID is recommended.
- Search is client-side; large datasets would require pagination and/or server-side filtering.
- Add Book modal is present as a placeholder; form validation should be enforced.

---

## 4. Conclusion and Future Scope

### 4.1 Conclusion

LibManager demonstrates a maintainable React architecture with clear separation of layout, feature modules, and state. Zustand enables simple, predictable updates, while Tailwind CSS ensures fast styling with consistent UI.

### 4.2 Future Scope

- Persist data using LocalStorage, IndexedDB, or a backend (REST/GraphQL).
- Authentication + role-based access (Admin/Librarian/Student).
- Advanced filters (category, availability, author), sorting, and pagination.
- Proper Add/Edit forms with React Hook Form + schema validation (Zod/Yup).
- Unit tests (store + components) and CI workflow.
- Accessibility improvements (keyboard navigation, focus trapping in modals).
- Dashboard analytics (counts by category/status, recent activity).

---

## Tech Stack

- React (UI)
- Vite (build tool)
- Tailwind CSS (styling)
- Zustand (state management)
- React Router DOM (routing)
- lucide-react (icons)

---

## Getting Started (Windows / VS Code)

### Prerequisites
- Node.js (LTS recommended)
- npm (comes with Node)

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
```

Open the printed local URL (usually `http://localhost:5173/`).

### Build (production)
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## Key Files

- `src/store/useLibraryStore.js` — Zustand store (books + actions)
- `src/components/layout/Layout.jsx` — Sidebar layout + `<Outlet />`
- `src/features/books/BookList.jsx` — Table UI, search filter, actions
- `src/App.jsx` — Routes configuration

Additional utilities:

- `src/components/ui/Button.jsx` — Reusable button component
- `src/hooks/useDebounce.js` — Debounce hook for inputs
- `src/utils/validators.js` — Validation helpers
- `src/utils/formatters.js` — Formatting helpers

---

## References

- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- Zustand Documentation: https://zustand-demo.pmnd.rs/
- Tailwind CSS Documentation: https://tailwindcss.com/
- React Router Documentation: https://reactrouter.com/