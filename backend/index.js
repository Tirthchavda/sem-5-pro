import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
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

//api's
app.use("/api/v1/user", userRoutes);

//"http://localhost:8000/api/v1/user/register"
//"http://localhost:8000/api/v1/user/login"
//"http://localhost:8000/api/v1/user/profile/update"

// Make sure your .env file has PORT=8000
app.listen(PORT,()=>{
    connectDB(); // Ensure connectDB logs "mongodb connected successfully" inside its implementation
    console.log(`Server running at port ${PORT}`);
    
})