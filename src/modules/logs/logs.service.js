import {db } from "../../db/connection.js"

const createLogsCollection = async () => {
    const result = await db.createCollection("logs", {
      capped: true,       
      size: 1024 * 1024,   
      max: 1000            
    });
 return result;
}
const insertLog = async (logData) => {
  const result = await db.collection("logs").insertOne(logData);
  return result; 
};


export {createLogsCollection, insertLog}