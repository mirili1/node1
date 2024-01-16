import express from "express";
import * as bookController from '../controllers/book.js'
import * as authenticatio  from "../controllers/auth.js";
const router=express.Router();
router.get("/",bookController.getAllBooks);//פרמטרים אפשרים
router.get("/betweenPages",bookController.getBooksBetweenPages);
router.get('/:id',bookController.getBookById);
router.delete('/:id',authenticatio.simpleAuth,bookController.deleteBookById);
router.post("/",authenticatio.simpleAuth,bookController.addNewBook);
router.put("/:id",bookController.updateBookById);
export default router;
