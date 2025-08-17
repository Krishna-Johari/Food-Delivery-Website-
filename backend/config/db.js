import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://joharikrishna:qscvbnkp@cluster0.n51yu.mongodb.net/react_js').then(()=>console.log("DB connected"));
} 