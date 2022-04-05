import express from "express";
// Imported controller methods to route urls to methods
import * as JobsController from "./../controllers/jobs-controller.js";

const router = express.Router();

router
  .route("/jobs") // Entry Route
  .post(JobsController.postJob) // Post Route
  .get(JobsController.getAllJobs); // Get Route

router
  .route("/jobs/:id") // Entry Route
  .get(JobsController.getJobById) // Get by id Route
  .put(JobsController.updateJob) // Update by id Route
  .delete(JobsController.removeJob); // Delete by id Route

export default router;
