import React, { useState, useMemo, useCallback } from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { Search, Plus, Trash2, RefreshCcw } from 'lucide-react';
import BookForm from './BookForm';

export default function BookList() {
    const { books, searchQuery, setSearchQuery, deleteBook, toggleStatus, addBook } = useLibraryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Advanced Filtering Logic with useMemo for performance
    const filteredBooks = useMemo(() => {
        if (!searchQuery.trim()) return books;
        const lowerQuery = searchQuery.toLowerCase();
        return books.filter(book =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery)
        );
    }, [books, searchQuery]);

    // Memoized callbacks
    const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

    const handleAddBook = useCallback(
        (book) => {
            addBook(book);
            setIsModalOpen(false);
        },
        [addBook]
    );

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Book Directory</h2>
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                    <Plus size={18} /> Add New Book
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Title</th>
                            <th className="p-4 font-semibold text-gray-600">Author</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <tr key={book.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium">{book.title}</td>
                                    <td className="p-4 text-gray-600">{book.author}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => toggleStatus(book.id)}
                                            title="Borrow/Return"
                                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
                                        >
                                            <RefreshCcw size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteBook(book.id)}
                                            title="Delete"
                                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    No books found matching "{searchQuery}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Book Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Add Book"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) handleCloseModal();
                    }}
                >
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Add Book</h3>
                        <BookForm onSubmit={handleAddBook} onCancel={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
