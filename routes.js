"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const bookService_1 = require("./src/services/bookService");
const router = (0, express_1.Router)();
exports.router = router;
const bookService = new bookService_1.BookService();
router.get("/book", (req, res) => {
    try {
        const books = bookService.getBooks();
        res.status(200).send(books);
    }
    catch (error) {
        console.error("Error while fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/book/:id", (req, res) => {
    try {
        const bookParams = parseInt(req.params.id);
        const book = bookService.getBookById(bookParams);
        if (book) {
            res.status(200).send(book);
        }
    }
    catch (error) {
        console.error("Error while fetching book:", error);
        res.status(404).send(error.message);
    }
});
router.post("/book", (req, res) => {
    try {
        const body = req.body;
        const newBook = bookService.addBook(body);
        res.status(201).send(newBook);
    }
    catch (error) {
        console.error("Error while adding book:", error);
        if (error.message.includes("already exists")) {
            res.status(409).send(error.message);
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    }
});
