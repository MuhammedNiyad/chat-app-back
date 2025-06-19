import express from "express";
import * as ChatController from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/room", authenticate, ChatController.getOrCreate);
router.post("/message", authenticate, ChatController.postMessage);
router.get("/messages/:roomId", authenticate, ChatController.fetchMessages);
router.post("/group", authenticate, ChatController.createGroup);
router.get("/rooms", authenticate, ChatController.myRooms);

export default router;