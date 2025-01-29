import express from "express";
import { signup, login, logout, getHome } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getHome", protectedRoute, getHome);

export default router;
