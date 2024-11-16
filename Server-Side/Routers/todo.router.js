import { Router } from "express";
import {todos,getTodos, deleteTodo, updateTodos, toggleTodoCheck, getSortedTodos} from "../controllers/todos.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";


const router=Router();

router.route('/post').post(authMiddleware,todos);
router.route('/getTodos').get(authMiddleware,getTodos)
router.route('/deleteTodos/:id').delete(authMiddleware,deleteTodo);
router.route('/updateTodos/:id').put(authMiddleware,updateTodos);
router.route("/toggleCheck/:id").put (authMiddleware,toggleTodoCheck);
router.route("/getSortedTodos").get (authMiddleware,getSortedTodos);




export {router}