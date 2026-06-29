import express from "express";
import { chatAI } from "../controller/AiContrallor.js";

const router = express.Router();

router.post("/chat", chatAI);

export default router;