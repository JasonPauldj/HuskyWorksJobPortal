import express from "express";
// Imported controller methods to route urls to methods
import * as ApplicationsController from "./../controllers/applications-controller.js";

const router = express.Router();

router
  .route("/applications") // Entry Route
  .post(ApplicationsController.createApplication)
  .get(ApplicationsController.getAllApplications) // Post Route
 
export default router;
