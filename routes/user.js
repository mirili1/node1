import express from "express";
import * as userController from '../controllers/user.js'
import * as authenticatio  from "../controllers/auth.js";
const router=express.Router();
router.get("/",authenticatio.adminAuth,userController.getAllUsers);
router.post("/signUp",userController.addNewUser);
router.post('/signIn',userController.login);
router.delete('/:id',authenticatio.simpleAuth,userController.deleteUserById);
router.put("/:id",authenticatio.simpleAuth,userController.updateUserById);
export default router;
