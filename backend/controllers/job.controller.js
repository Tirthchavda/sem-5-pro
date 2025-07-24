import e from "express";
import { Job } from "../models/job.model.js";

// admin post karega job
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id; // Assuming req.id is the authenticated user's ID

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobtype ||
      !experience ||
      !position ||
      !companyId 
    ) {
      return res
        .status(400)
        .json({ message: "Somthing is missing.", success: false });
    }
    const skills = typeof requirements === "string" ? requirements.split(",") : requirements;

    const job = await Job.create({
      title,
      description,
      requirements: skills          ,
      salary,
      location,
      jobtype,
      experienceLevel: experience,
      position,
      created_by: companyId, // Assuming req.id is the authenticated user's ID
      company: companyId, // Assuming companyId is the ID of the company
    });
    return res
      .status(201)
      .json({ message: "New Job posted successfully", success: true, job });
  } catch (error) {
    console.error("Error in postjob:", error);
  }
};

//students k liye
export const getAlljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query);
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error in getAlljobs:", error);
  }
};

//students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error in getJobById:", error);
  }
};

// admin kitne job create kara hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const admin = req.id; // Get the authenticated user's ID from middleware
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error in getAdminJobs:", error);
  }
};
