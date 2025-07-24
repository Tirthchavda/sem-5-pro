import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAlljobs, postjob, getJobById } from '../controllers/job.controller.js';

const router = express.Router();

router.route("/post").post(isAuthenticated, postjob);
router.route("/get").post(isAuthenticated, getAlljobs);
router.route("/getadminjobs").post(isAuthenticated, getAdminJobs);
router.route("/get/:id").post(isAuthenticated, getJobById);

export default router;