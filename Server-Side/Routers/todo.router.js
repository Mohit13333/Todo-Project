import { Router } from "express";
import {todos,getTodos, deleteTodo, updateTodos, toggleTodoCheck, getSortedTodos} from "../controllers/todos.controller.js";


const router=Router();

router.route('/post').post(todos);
router.route('/getTodos').get(getTodos)
router.route('/deleteTodos/:id').delete(deleteTodo);
router.route('/updateTodos/:id').put(updateTodos);
router.route("/toggleCheck/:id").put (toggleTodoCheck);
router.route("/getSortedTodos").get (getSortedTodos);




export {router}