import { Router } from "express";
const router = Router();
import {createLogsCollection,insertLog} from "./logs.service.js"

router.post("/collection/logs", async (req, res) => {
  try {
    const result = await createLogsCollection();
    res.json({
      message: "Logs collection created successfully",
      collection: result.collectionName
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/logs", async (req, res) => {
  try {
    const logData = req.body;

    const result = await insertLog(logData);

    res.json({
      message: "Log inserted successfully",
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;