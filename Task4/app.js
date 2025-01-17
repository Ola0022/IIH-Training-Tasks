const express = require("express");
const app = express();
app.use(express.json());

class Book {
  constructor(bookId, bookName, bookTitle) {
    this.id = bookId;
    this.name = bookName;
    this.title = bookTitle;
  }

  ChangeTranslation(language) {
    this.title = `${this.title} - (${language})`;
  }

  static validate(book) {
    if (!(book instanceof Book)) {
      return "book must be instance of the Book class";
    }
    if (!book.id || typeof book.id !== "number") {
      return "Invalid or missing ID";
    }
    if (!book.name || typeof book.name !== "string") {
      return "Invalid or missing Name";
    }
    if (!book.title || typeof book.title !== "string") {
      return "Invalid or missing Title";
    }
    return null;
  }
}

let books = [];

//add a book
app.post("/books", (req, res) => {
  const { id, name, title } = req.body;
  if (books.some((book) => book.id === id)) {
    return res.status(400).json({ error: "this book already exists" });
  }
  const newBook = new Book(id, name, title);
  const error = Book.validate(newBook);
  if (error) return res.status(400).json({ error });

  books.push(newBook);
  res.status(201).json({ message: "book has been added" });
});

//get all books
app.get("/books", (req, res) => {
  res.json(books);
});

//get one book by id
app.get("/getAbook/:id", (req, res) => {
  const bookID = parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === bookID);
  if (!book) {
    return res.status(400).json({ error: "sorry book not found" });
  }

  res.status(200).json({ book });
});

//update book
app.put("/books/:id", (req, res) => {
  const bookID = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === bookID);
  if (bookIndex === -1) {
    return res
      .status(400)
      .json({ error: "sorry book not found unable to update the book" });
  }

  const { name, title } = req.body;

  if (name) books[bookIndex].name = name;
  if (title) books[bookIndex].title = title;

  res
    .status(200)
    .json({ message: "book has been updated", book: books[bookIndex] });
});

//delete a book by id
app.delete("/books/:id", (req, res) => {
  const bookID = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === bookID);
  if (bookIndex === -1) {
    return res
      .status(400)
      .json({ error: "sorry book not found unable to delete the book" });
  }

  books.splice(bookIndex, 1);

  res.status(200).json({ message: "book has been deeleted" });
});

//change translation
app.patch("/books/:id/translation", (req, res) => {
  const bookID = parseInt(req.params.id, 10);
  const { language } = req.body;
  if (!language || typeof language !== "string") {
    return res.status(400).json({ error: "sorry invalid or missing language" });
  }

  const book = books.find((b) => b.id === bookID);
  if (!book) {
    return res.status(404).json({ error: "this book not found" });
  }

  book.ChangeTranslation(language);

  res.status(201).json({ message: "book has been translated", book });
});

const port = 3001;
app.listen(port, () => {
  console.log(`library system is started on http://localhost${port}`);
});
