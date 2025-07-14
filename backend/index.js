import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();



// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // fixed typo
    credentials: true // lowercase 'credentials'
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

// Make sure your .env file has PORT=8000
app.listen(PORT,()=>{
    connectDB(); // Ensure connectDB logs "mongodb connected successfully" inside its implementation
    console.log(`Server running at port ${PORT}`);
    
})