import { Router } from "express";
import contactForm from "../controllers/contactForm.controller.js";
const router=Router();


router.route("/contact").post(contactForm);


export {router};