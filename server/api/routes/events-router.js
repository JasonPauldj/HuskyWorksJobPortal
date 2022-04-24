import express from "express";
// Imported controller methods to route urls to methods
import * as EventsController from "./../controllers/events-controller.js";

const router = express.Router();

router
  .route("/events") // Entry Route
  .post(EventsController.createEvent) // Post Route
  .get(EventsController.getAllEvents); // Get Route

router
  .route("/events/:id") // Entry Route
  .get(EventsController.get) // Get by id Route
  .put(EventsController.update) // Update event
  .delete(EventsController.remove) // Delete Event

router
  .route("/students/events/:id")
  .get(EventsController.getEventsByStudentId) // Entry Route

  
export default router;
