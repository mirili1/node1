import { json } from "express";
import { Book, bookValidator } from "../models/book.js";
import mongoose from "mongoose";
export const getAllBooks = async (req, res) => {
    try {
        let { name, numPages, audience } = req.query;
        let allBooks = {};
        let searchObject = {};
        if (name)
            searchObject.name = new RegExp(name, "i");
        if (numPages)
            searchObject.numPages = numPages;
        if (audience)
            searchObject.audience = audience;
        allBooks = await Book.find(searchObject);
        res.json(allBooks);
    }
    catch (err) {
        res.status(400).send("the books arnt available " + err.message);
    }
}
export const getBooksBetweenPages = async (req, res) => {
    try {
        let { minPages, maxPages, booksInScreen, numOfScreen } = req.query;
        let allBooks = {};
        let searchObject = {};
        if (minPages)
            searchObject.numPages = { $gte: minPages }
        if (maxPages)
            searchObject.numPages = { $lte: maxPages }
        allBooks = await Book.find(searchObject).skip((numOfScreen - 1) * booksInScreen).limit(booksInScreen);
        res.json(allBooks);
    }
    catch (err) {
        res.status(400).send("no books " + err.message);
    }
}
export const getBookById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id inst valid")
        let book = await Book.findById(id);
        if (!book)
            return res.status(404).send("no such book");
        res.json(book)
    }
    catch (err) {
        res.status(400).send("problem " + err.message);
    }
}
export const deleteBookById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id inst valid")
        let book = await Book.findById(id);
        if (!book)
            return res.status(404).send("no such book");
        if (book.userAdded != req.user._id)
            return res.status(404).send("You are not authorized");
        book = await Book.findByIdAndDelete(id);
        res.json(book)
    }
    catch (err) {
        res.status(400).send("problem " + err.message);
    }
}
export const addNewBook = async (req, res) => {
    try {  
        let { name, numPages, audience, imgUrl } = req.body;
        let userAdded=req.user._id;
        let validate = bookValidator(req.body);          
        if (validate.error) {  
           return  res.status(400).send(validate.error.details[0]);
    }     
        let sameBooks = await Book.find(req.body);
        if (sameBooks.length > 0) {
           return res.status(409).send("this book already exists ");;
        }
        
        let bookToAdd = await Book.create({ name, numPages, audience,userAdded ,imgUrl });
        res.status(201).json(bookToAdd)
    }
    catch (err) {
        res.status(400).send("its impossible to add this book " + err.message);
    }
}
export const updateBookById = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, numPages, audience, imgUrl } = req.body;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id inst valid");
        let book = await Book.findById(id);
        if (!book)
            return res.status(404).send("no such book");
        book.name = name || book.name;
        book.numPages = numPages || book.numOfScreen;
        book.audience = audience || book.audience;
        book.imgUrl = imgUrl || book.imgUrl;
        await book.save();
        res.json(book);
    }
    catch (err) {
        res.status(400).send("its impossible to update this book" + err.message);
    }
}