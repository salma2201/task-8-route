import {db} from "../connection.js";
const books=db.collection("books");
const authors=db.collection("authors");
const logs=db.collection("logs");
export {books,authors,logs};