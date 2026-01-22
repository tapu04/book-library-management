import React, { useMemo, useState } from 'react';
import { validateBook } from '../../utils/validators';

const initialForm = {
    title: '',
    author: '',
    category: '',
};

export default function BookForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState(initialForm);
    const [touched, setTouched] = useState({});
    const { isValid, errors } = useMemo(() => validateBook(form), [form]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleBlur = (field) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ title: true, author: true, category: true });

        const result = validateBook(form);
        if (!result.isValid) return;

        onSubmit?.({
            title: form.title.trim(),
            author: form.author.trim(),
            category: form.category.trim(),
        });

        setForm(initialForm);
        setTouched({});
    };

    const showError = (field) => Boolean(touched[field] && errors[field]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    value={form.title}
                    onChange={handleChange('title')}
                    onBlur={handleBlur('title')}
                    className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${showError('title') ? 'border-red-400' : 'border-gray-200'
                        }`}
                    placeholder="e.g., Atomic Habits"
                />
                {showError('title') && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                    value={form.author}
                    onChange={handleChange('author')}
                    onBlur={handleBlur('author')}
                    className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${showError('author') ? 'border-red-400' : 'border-gray-200'
                        }`}
                    placeholder="e.g., James Clear"
                />
                {showError('author') && <p className="text-sm text-red-600 mt-1">{errors.author}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                    value={form.category}
                    onChange={handleChange('category')}
                    onBlur={handleBlur('category')}
                    className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${showError('category') ? 'border-red-400' : 'border-gray-200'
                        }`}
                    placeholder="e.g., Self-Help"
                />
                {showError('category') && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 font-medium transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!isValid}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                    Add Book
                </button>
            </div>
        </form>
    );
}
