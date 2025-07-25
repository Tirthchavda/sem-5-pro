import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAlljobs, postjob, getJobById } from '../controllers/job.controller.js';

const router = express.Router();

router.route("/post").post(isAuthenticated, postjob);
router.route("/get").get(isAuthenticated, getAlljobs);
router.route("/getadminjobs").(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;