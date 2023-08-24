import { Book, books } from "../persistence/entities/Book";

export class BookService {
  getBooks(): Book[] {
    return books;
  }

  getBookById(id: number): Book | null {
    const findBookById = books.find((book) => book.id === id);
    if (findBookById) {
      return findBookById;
    } else {
      throw new Error(`Book with id: ${id} not found`);
    }
  }

  addBook(body: Book) {
    const idExists = books.some((book) => book.id === body.id);
    if (idExists) {
      throw new Error(`book with id: ${body.id} already exists`);
    } else {
      books.push(body);
      return body;
    }
  }

  //Todo: Fill this method
  editBook() {}

  deleteBook(id: number) {
    const index = books.findIndex((book) => book.id == id);
    if (index > -1) {
      books.splice(index, 1);
      return { message: "Book deleted", id };
    }
    return { message: "Book not found", id };
  }
}
