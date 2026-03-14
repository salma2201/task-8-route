import express from 'express';
import {connectDb,db} from "./db/connection.js"
import booksRouter from "./modules/books/books.controller.js"
import authorsRouter from "./modules/author/author.controller.js"
import logsRouter from "./modules/logs/logs.controller.js"
const app=express();
const port=3000;
connectDb();
app.use(express.json()); //parsing req.body 
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/logs',logsRouter);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
