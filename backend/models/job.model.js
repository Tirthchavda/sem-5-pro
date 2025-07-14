import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobtype: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', // Assuming you have a Company model
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    applications: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'application', // Assuming you have a User model  
    }
} , { timestamps: true });
export const Job = mongoose.model("Job", jobSchema);