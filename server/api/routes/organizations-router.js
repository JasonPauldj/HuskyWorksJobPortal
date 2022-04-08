import express from "express";
// Imported controller methods to route urls to methods
import * as OrganizationsController from "./../controllers/organizations-controller.js";

const router = express.Router();

router
  .route("/organizations") // Entry Route
  .post(OrganizationsController.postOrganization) // Post Route
  .get(OrganizationsController.getAllOrganizations); // Get Route

router
  .route("/organizations/:id") // Entry Route
  .get(OrganizationsController.getOrganizationById) // Get by id Route
  .put(OrganizationsController.updateOrganization) // Update by id Route
  .delete(OrganizationsController.removeOrganization); // Delete by id Route

export default router;
