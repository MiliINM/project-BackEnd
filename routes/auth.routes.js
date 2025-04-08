// src/routes/auth.routes.js
import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  updateProfile,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { authRequired } from "../middlewares/auth.middleware.js"; // Add this import

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
router.put("/profile", authRequired, updateProfile);


export default router;
