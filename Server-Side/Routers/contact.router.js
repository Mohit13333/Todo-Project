import { Router } from "express";
import contactForm from "../Controllers/contactForm.controller.js";
const router=Router();


router.route("/contact").post(contactForm);


export {router};