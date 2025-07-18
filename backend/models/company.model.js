import mongoose from "mongoose";

const companyschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure company names are unique
    },
    description: {
        type: String,
        required: true,
    },
    website:{
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String, // URL to the logo image
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
}, { timestamps: true });

export const Company = mongoose.model('Company', companyschema);
