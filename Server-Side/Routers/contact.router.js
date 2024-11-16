import { Router } from "express";
import contactForm from "../Controllers/contactForm.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router=Router();


router.route("/contact").post(authMiddleware, contactForm);


export {router};