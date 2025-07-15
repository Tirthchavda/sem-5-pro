import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Somthing is missing",
            success: false });
            
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });
        return res.status(201).json({ message: "Account created successfully", success: true });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!fullname || !email || !password || !role) {
            return res.status(400).json({ message: "Somthing is missing",
            success: false 
        });    
        };
        let user = await User.findOne({ email});
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }
        const ispasswordmatch = await bcrypt.compare(password, user.password);
        if (!ispasswordmatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        };
        //checking role is correct or not 
        if (user.role !== role) {
            return res.status(400).json({ message: "Account doesn't exist with current role.", success: false });
        };

        const tokenData = {
            userId:user._id,
    }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile : user.profile,
        }
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true,sameSite: 'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success: true,
        })
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0, httpOnly: true, sameSite: 'strict'}).json({
            message: "Logged out successfully",
            success: true,
        });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file; // Assuming you are using multer for file uploads
        if(!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "Somthing is missing",
            success: false });
        };

        //cloud

        const skillsArray = skills.split(',').map(skill => skill.trim());
        const userId = req.id; //middelware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        
        // Update user data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        // resume comes leter here..


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile : user.profile,
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });

    }
    catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}