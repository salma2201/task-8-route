import { books } from "../../db/models/model.js";
import {db} from "../../db/connection.js";

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
              description: "Title must be a non-empty string"
            }
          }
        }
      }
    });
    return result;
  }

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
    { $set: { year: newYear } } 
  );

  return result; 
};
const findBookByTitle = async (title) => {
  const result = await books.findOne({ title: title });
  return result;
};



export { createBooksCollection, createTitleIndex, insertBook, insertManyBooks, updateBookYearByTitle, findBookByTitle }
