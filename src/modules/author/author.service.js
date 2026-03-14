import {db} from "../../db/connection.js"

const insertAuthor = async (authorData) => {
  const result = await db.collection("authors").insertOne(authorData);
  return result;
};

export { insertAuthor };