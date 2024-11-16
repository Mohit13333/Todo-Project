import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleWare from "../middlewares/admin.middleware.js";
import { adminPanel, deleteContact, deleteUser, getUsersById, updateUser } from "../controllers/admin.controller.js";
const router=Router();

router.route("/admin").get(authMiddleware,adminMiddleWare,adminPanel)
router.route("/admin/delete/:id").delete(authMiddleware,adminMiddleWare,deleteUser);
router.route("/:id").get(authMiddleware,adminMiddleWare,getUsersById)
router.route("/admin/update/:id").patch(authMiddleware,adminMiddleWare,updateUser)
router.route("/admin/delete/contact/:id").delete(authMiddleware,adminMiddleWare,deleteContact);

export {router};