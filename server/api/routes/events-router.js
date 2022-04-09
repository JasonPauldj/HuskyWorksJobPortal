import express from "express";
// Imported controller methods to route urls to methods
import * as EventsController from "./../controllers/events-controller.js";

const router = express.Router();

router
  .route("/events") // Entry Route
  .post(EventsController.createEvent) // Post Route
  .get(EventsController.getAllEvents); // Get Route



export default router;
