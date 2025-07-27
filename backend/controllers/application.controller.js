import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // Get the authenticated user's ID from middleware
        const jobId = req.params.id; // Get the job ID from the request parameters
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        };
         //check if the user has already applied for the job
         const existingApplication = await Application.findOne({
            job:jobId,
            applicant: userId
         });

         if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        }); 

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job application submitted successfully",
            success: true,
        });

    } catch (error) {
    console.error("Error in applyJob:", error);        
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id; // Get the authenticated user's ID from middleware
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .populate({ 
                path: 'job',
                options: { sort: { createdAt: -1 } }, // Sort jobs by creation date
                populate: {
                    path: 'company',
                    options: {sort: { createdAt: -1 } }, // Sort companies by creation date
                }
            });
            if(!applications){
                return res.status(404).json({ message: "No applications found", success: false });
            };

        return res.status(200).json({
            applications,
            success: true,
        }); 

    } catch (error) {
        console.log("Error in getAppliedJobs:", error);
    }
};

//admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
    try {
        const jobid = req.params.id; // Get the job ID from the request parameters
        const job = await Job.findById(jobid).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } }, // Sort applications by creation date
            populate: {
                path: 'applicant',
            }
        });

        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        };

        return res.status(200).json({
            job,
            success: true,
        });

    } catch (error) {
        console.error("Error in getApplicants:", error); 
    }
};

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body; // Get the status from the request body
        const applicationId = req.params.id; // Get the application ID from the request parameters
        if (!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        };

        // Find the application by application ID
        const application = await Application.findOne({ _id: applicationId }); 
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        };

        //update the status of the application
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error in updateStatus:", error);
    }
}