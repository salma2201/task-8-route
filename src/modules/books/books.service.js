import { books } from "../../db/models/model.js";
import { db } from "../../db/connection.js";

const createBooksCollection = async () => {
  const result = await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "Title must be a non-empty string",
          },
        },
      },
    },
  });
  return result;
};

const createTitleIndex = async () => {
  const result = await books.createIndex({ title: 1 }, { unique: false });
  return result;
};

const insertBook = async (bookData) => {
  const result = await books.insertOne(bookData);
  return result;
};
const insertManyBooks = async (booksArray) => {
  const result = await books.insertMany(booksArray);
  return result;
};
const updateBookYearByTitle = async (title, newYear) => {
  const result = await books.updateOne(
    { title: title },
    { $set: { year: newYear } },
  );

  return result;
};
const findBookByTitle = async (title) => {
  const result = await books.findOne({ title: title });
  return result;
};

const findBooksBetweenYears = async () => {
  const result = await books
    .find({ year: { $gte: 1990, $lte: 2010 } })
    .toArray();

  return result;
};
const findFictionBooks = async () => {
  const result = await books.find({ genres: "science fiction" }).toArray();
  return result;
};

const getBooksSortedPaged = async () => {
  const result = await books
    .find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();

  return result;
};
const findBooksWithIntegerYear = async () => {
  const result = await books
    .find({
      year: { $type: "int" },
    })
    .toArray();

  return result;
};
const findBooksWithoutHorrorOrSciFi = async () => {
  const result = await books
    .find({
      genres: { $nin: ["Horror", "science fiction"] },
    })
    .toArray();

  return result;
};
const deleteBooksBefore2000 = async () => {
  const result = await books.deleteMany({
    year: { $lt: 2000 },
  });

  return result;
};
const getBooksAfter2000Sorted = async () => {
  const result = await books
    .aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $sort: { year: -1 },
      },
    ])
    .toArray();

  return result;
};
const getBooksAfter2000Fields = async () => {
  const result = await books
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();

  return result;
};
const unwindBookGenres = async () => {
  const result = await books
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();

  return result;
};
const joinBooksWithLogs = async () => {
  const result = await books.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "bookId",
        as: "book_logs"
      }
    },
    {
      $project: {
        _id: 0,
        title: 1,
        book_logs: 1
      }
    }
  ]).toArray();

  return result;
};
export {
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
  joinBooksWithLogs
};
