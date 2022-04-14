import express from "express";
// Imported controller methods to route urls to methods
import * as ApplicationsController from "./../controllers/applications-controller.js";

const router = express.Router();

router
  .route("/applications") // Entry Route
  .post(ApplicationsController.createApplication)
  .get(ApplicationsController.getAllApplications); // Post Route


router
  .route("/applications/:id") // Entry Route
  .get(ApplicationsController.getApplication)
  .put(ApplicationsController.update)
  .delete(ApplicationsController.remove);


 
export default router;
