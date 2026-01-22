// Validation utilities
export const validateBook = (book) => {
    const errors = {};

    if (!book.title || book.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (!book.author || book.author.trim() === '') {
        errors.author = 'Author is required';
    }

    if (!book.category || book.category.trim() === '') {
        errors.category = 'Category is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
