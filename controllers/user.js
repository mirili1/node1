import { User, userValidator } from "../models/user.js";
import mongoose from "mongoose";
import bcyript from "bcryptjs"
import { generateToken } from '../config/jwt.js'
export const getAllUsers = async (req, res) => {
    try {
        let { status } = req.query;
        let allUsers = {};
        allUsers = await User.find({status});
        res.json(allUsers);
    }
    catch (err) {
        res.status(400).send("the users arnt available " + err.message);
    }
}
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user)
            return res.status(404).send("no such user");
        if (!await bcyript.compare(password, user.password))
            return res.status(401).send("did you forget your password?");
        let { _id, name, email: userEmail, status } = user;
        let token = generateToken(user);
        res.json({ _id, name, userEmail, status, token });
    }
    catch (err) {
        res.status(400).send("problem " + err.message);
    }
}
export const addNewUser = async (req, res) => {
    try {
        let { name, password, email, status } = req.body;
        let validate = userValidator(req.body);
        if (validate.error) {
           return res.status(400).send(validate.error[0]);;
        }
        password = await bcyript.hash(password, 15);
        let sameUsers = await User.find(req.body);
        if (sameUsers.length > 0) {
          return  res.status(409).send("this user already exists ");;
        }
        let userToAdd = await User.create({ name, password, email, status })
        let { _id, name: userName, email: userEmail, status: userStaus } = userToAdd;
        let token = generateToken(userToAdd);
        res.json({ _id, userName, userEmail, userStaus, token });
    }
    catch (err) {
        res.status(400).send("its impossible to add this user " + err.message);
    }
}
export const deleteUserById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id inst valid")
        let user = await User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).send("no such user");
        res.json(user)
    }
    catch (err) {
        res.status(400).send("problem " + err.message)
    }
}
export const updateUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, password, email, status } = req.body;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id inst valid")
        let user = await User.findById(id);
        if (!user)
            return res.status(404).send("no such user");
        user.name = name || user.name;
        user.password = password || user.password;
        user.email = email || user.email;
        user.status = status || user.status;
        await user.save();
        res.json(user);
    }
    catch (err) {
        res.status(400).send("its impossible to update this user " + err.message);
    }
}

