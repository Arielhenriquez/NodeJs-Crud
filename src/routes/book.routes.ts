import { Router, Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../persistence/entities/Book";

const router = Router();
const bookService = new BookService();

router.get("/book", (req: Request, res: Response) => {
  try {
    const books = bookService.getBooks();
    res.status(200).send(books);
  } catch (error: any) {
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
  } catch (error: any) {
    console.error("Error while fetching book:", error);
    res.status(404).send(error.message);
  }
});

router.post("/book", (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newBook = bookService.addBook(body as Book);
    res.status(201).send(newBook);
  } catch (error: any) {
    console.error("Error while adding book:", error);
    res.status(409).send(error.message);
  }
});

router.put("/book/:id", (req: Request, res: Response) => {
  try {
    const bookParams = parseInt(req.params.id);
    const requestBody: Book = req.body;
    const updatedBook = bookService.editBook(bookParams, requestBody);
    res.status(200).send(updatedBook);
  } catch (error: any) {
    console.error("Error while updating book:", error);
    res.status(404).send(error.message);
  }
});

router.delete("/book/:id", (req: Request, res: Response) => {
  const bookParams = parseInt(req.params.id);
  const deleteBook = bookService.deleteBook(bookParams);
  if (deleteBook.message === "Book deleted") {
    res.status(200).send(deleteBook);
  } else {
    res.status(404).send(deleteBook);
  }
});

export const bookRoutes = router;
