import mongoose from "mongoose";
export const connectToDB = async () => {
    try {
        const mongoURI = process.env.DB_CONNECTION || "mongodb://0.0.0.0:27017/library";
        await mongoose.connect(mongoURI);
        console.log("succeded to connect db");
    }
    catch (err) {
        console.log("cannot connect to db"); 
        console.log(err);
        process.exit(1);
    }
}

