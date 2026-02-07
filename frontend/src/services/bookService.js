import API from './api';

export const getBooks = () => API.get('/books');
export const getBookById = (id) => API.get(`/books/${id}`);
export const addBook = (book) => API.post('/books', book);
export const addReview = (bookId, review) => API.post(`/books/${bookId}/reviews`, review);
export const deleteBook = (bookId) => API.delete(`/books/${bookId}`);
