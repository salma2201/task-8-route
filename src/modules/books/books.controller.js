import { Router } from "express";
const router = Router();
import {
  createBooksCollection,
  createTitleIndex,
  insertBook,
  insertManyBooks,
  updateBookYearByTitle,findBookByTitle
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
      modifiedCount: result.modifiedCount
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
        message: "Book not found"
      });
    }

    res.json({
      message: "Book found",
      book: book
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
