import { Router } from "express";
const router = Router();
import {
  createBooksCollection,
  createTitleIndex,
  insertBook,
  insertManyBooks,
  updateBookYearByTitle,
  findBookByTitle,
  findBooksBetweenYears,
  findFictionBooks,
  getBooksSortedPaged,
  findBooksWithIntegerYear,
  findBooksWithoutHorrorOrSciFi,
  deleteBooksBefore2000,
  getBooksAfter2000Sorted,
  getBooksAfter2000Fields,
  unwindBookGenres,
  joinBooksWithLogs,
} from "./books.service.js";

router.post("/collection/books", async (req, res, next) => {
  try {
    const result = await createBooksCollection();
    res.json({
      message: "Books collection created successfully",
      collection: result.collectionName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/collection/books/index", async (req, res) => {
  try {
    const indexName = await createTitleIndex();
    res.json({
      message: "Index created successfully",
      index: indexName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/books", async (req, res) => {
  try {
    const bookData = req.body;
    const result = await insertBook(bookData);

    res.json({
      message: "Book inserted successfully",
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/books/batch", async (req, res) => {
  try {
    const booksArray = req.body;

    if (!Array.isArray(booksArray)) {
      return res
        .status(400)
        .json({ error: "Request body must be an array of books" });
    }

    const result = await insertManyBooks(booksArray);

    res.json({
      message: "Books inserted successfully",
      acknowledged: result.acknowledged,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/Future", async (req, res) => {
  try {
    const { title, year } = req.body;

    const result = await updateBookYearByTitle(title, year);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No book found with this title" });
    }

    res.json({
      message: "Book updated successfully",
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const book = await findBookByTitle("Brave new world");

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json({
      message: "Book found",
      book: book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/year", async (req, res) => {
  try {
    const booksList = await findBooksBetweenYears();

    res.json({
      message: "Books between 1990 and 2010",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/science-fiction", async (req, res) => {
  try {
    const booksList = await findFictionBooks();

    res.json({
      message: "Science Fiction books",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/sorted", async (req, res) => {
  try {
    const booksList = await getBooksSortedPaged();

    res.json({
      message: "Books sorted by year (desc), skipped 2, limited to 3",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/year-integer", async (req, res) => {
  try {
    const booksList = await findBooksWithIntegerYear();

    res.json({
      message: "Books where year is stored as integer",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/no-horror-scifi", async (req, res) => {
  try {
    const booksList = await findBooksWithoutHorrorOrSciFi();

    res.json({
      message: "Books without Horror or Science Fiction genres",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/books/before-2000", async (req, res) => {
  try {
    const result = await deleteBooksBefore2000();

    res.json({
      message: "Books before 2000 deleted",
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/aggregate1", async (req, res) => {
  try {
    const booksList = await getBooksAfter2000Sorted();

    res.json({
      message: "Books published after 2000 sorted by year descending",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/aggregate2", async (req, res) => {
  try {
    const booksList = await getBooksAfter2000Fields();

    res.json({
      message: "Books published after 2000 (title, author, year only)",
      books: booksList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/aggregate3", async (req, res) => {
  try {
    const genresList = await unwindBookGenres();

    res.json({
      message: "Books genres broken into separate documents",
      genres: genresList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/aggregate4", async (req, res) => {
  try {
    const booksWithLogs = await joinBooksWithLogs();

    res.json({
      message: "Books joined with logs",
      data: booksWithLogs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
