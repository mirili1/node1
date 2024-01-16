import joi from "joi";
import mongoose from "mongoose";
const bookSchema=mongoose.Schema(
    {
    name:{type:String,required:true},
    numPages:{type:Number,required:true},
    audience:{type:String,default:"adults"},
    userAdded: String,
    imgUrl:{type:String,default:"http://localhost:6000/images/ספרים.png"}
})
export const Book=mongoose.model("books",bookSchema);

export const bookValidator = (_bookToValidate)=>{
  let bookJoi=joi.object({
    name:joi.string().required(),
    numPages:joi.number().required().min(0),
    audience:joi.string().default("adults"),
    imgUrl:joi.string().default("http://localhost:6000/images/ספרים.png")
  })
    
  return bookJoi.validate(_bookToValidate)
}