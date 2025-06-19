import express from "express";
import * as UserController from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/search", authenticate, UserController.search);
router.post("/add", authenticate, UserController.add);
router.get("/contacts", authenticate, UserController.getMyContacts);

export default router;
