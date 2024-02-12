import express from "express";
import {loginController, registerController} from "../controllers/authController.js"
import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";

// router object 
const router = express.Router();

// routes
// ragister // method post
router.post("/register", registerController);

// login // method post
router.post("/login",requireLogin, loginController);

// login admin // method post
router.post("/login/admin",requireLogin, isAdmin, loginController);

export default router;