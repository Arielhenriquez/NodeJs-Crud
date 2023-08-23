"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const Book_1 = require("../persistence/entities/Book");
class BookService {
    getBooks() {
        return Book_1.books;
    }
    getBookById(id) {
        const findBookById = Book_1.books.find((book) => book.id === id);
        if (findBookById) {
            return findBookById;
        }
        else {
            throw new Error(`Book with id: ${id} not found`);
        }
    }
    addBook(body) {
        const idExists = Book_1.books.some((book) => book.id === body.id);
        if (idExists) {
            throw new Error(`book with id: ${body.id} already exists`);
        }
        else {
            Book_1.books.push(body);
            return body;
        }
    }
    //Todo: Fill this method
    editBook() { }
}
exports.BookService = BookService;
