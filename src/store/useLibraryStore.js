import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock Data for startup (used only if localStorage is empty)
const initialBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "Available", category: "Fiction" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", status: "Borrowed", category: "Tech" },
];

export const useLibraryStore = create(
    persist(
        (set) => ({
            books: initialBooks,
            searchQuery: "",

            // Actions
            setSearchQuery: (query) => set({ searchQuery: query }),

            addBook: (book) => set((state) => ({
                books: [...state.books, { ...book, id: Date.now(), status: "Available" }]
            })),

            deleteBook: (id) => set((state) => ({
                books: state.books.filter((book) => book.id !== id)
            })),

            toggleStatus: (id) => set((state) => ({
                books: state.books.map((book) =>
                    book.id === id
                        ? { ...book, status: book.status === "Available" ? "Borrowed" : "Available" }
                        : book
                )
            })),
        }),
        {
            name: 'library-storage', // LocalStorage key name
        }
    )
);
