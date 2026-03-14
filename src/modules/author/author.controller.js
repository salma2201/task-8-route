import { Router } from "express";
const router = Router();
import { insertAuthor } from "./author.service.js";

router.post("/collection/authors",async(req,res,next)=>{
     try {
    const authorData = req.body;

    const result = await insertAuthor(authorData);

    res.json({
      message: "Author inserted successfully",
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
export default router;