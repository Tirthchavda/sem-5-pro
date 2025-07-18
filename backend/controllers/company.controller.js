import { company } from "../models/company.model.js";
import { User } from "../models/user.model.js";

export const registercompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({
          message: "Company already exists with this name",
          success: false,
        });
    }
    company = await Company.create({
      name: companyName, // Add other fields as necessary
      userId: req.id, // Assuming req.id is the authenticated user's ID
    });

    return res
      .status(201)
      .json({
        message: "Company registered successfully",
        success: true,
        company,
      });
  } catch (error) {
    console.error("Error in registercompany:", error);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // Get the authenticated user's ID from the request
    const company = await Company.findOne({ userId });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
  } catch (error) {
    console.error("Error in getCompany:", error);
  }
};
// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // Get = the company ID from the request parameters
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Company retrieved successfully",
        success: true,
        company,
      });
  } catch (error) {
    console.error("Error in getCompanyById:", error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file; // Assuming you are using multer for file uploads
    //idhar cloudinary ka code aayega

    const updateData = { name, description, website, location };

    const comapny = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res
      .status(200)
      .json({
        message: "Company updated successfully",
        success: true,
        company,
      });
      

  } catch (error) {
    console.error("Error in updateCompany:", error);
  }
};
