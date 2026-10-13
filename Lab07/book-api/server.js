// Lab 07 Assignment: Book Management REST API
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.json());

// Resolve relative to this file so the server works from any directory
const DATA_FILE = path.join(__dirname, "books.json");
let books = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

// Additional credit: persist every change to books.json
function saveBooks() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf8");
}

// Returns an error message, or null if the book data is valid
function validateBook(body) {
    const { title, author, price } = body || {};

    if (typeof title !== "string" || !title.trim()) {
        return "title is required as a non-empty string";
    }
    if (typeof author !== "string" || !author.trim()) {
        return "author is required as a non-empty string";
    }
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
        return "price is required as a non-negative number";
    }
    return null;
}

function findIndexById(idParam) {
    const id = Number(idParam);
    return books.findIndex(book => book.id === id);
}

// GET /books: return all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id: return one book or 404
app.get("/books/:id", (req, res) => {
    const index = findIndexById(req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(books[index]);
});

// POST /books: create a book and return 201
app.post("/books", (req, res) => {
    const error = validateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    const newId = books.length
        ? Math.max(...books.map(book => book.id)) + 1
        : 1;

    const newBook = {
        id: newId,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        price: req.body.price
    };

    books.push(newBook);
    saveBooks();
    return res.status(201).json(newBook);
});

// PUT /books/:id: update a book or return 404
app.put("/books/:id", (req, res) => {
    const index = findIndexById(req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const error = validateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    books[index] = {
        id: books[index].id,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        price: req.body.price
    };
    saveBooks();

    return res.status(200).json(books[index]);
});

// DELETE /books/:id: delete a book or return 404
app.delete("/books/:id", (req, res) => {
    const index = findIndexById(req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const [deletedBook] = books.splice(index, 1);
    saveBooks();

    return res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook
    });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Request body is not valid JSON" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Book API running at http://localhost:${PORT}`);
});
