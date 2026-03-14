import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.MONGO_URI);
export const db = client.db("Assignment_8");

export function connectDb(){
    client.connect()
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.error("Failed to connect to MongoDB", err);
    });
}