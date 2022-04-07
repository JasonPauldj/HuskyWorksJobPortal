import express from "express";
// Imported controller methods to route urls to methods
import * as StudentsController from "../controllers/students-controller.js";

const router = express.Router();

router
  .route("/students") // Entry Route
  .post(StudentsController.postStudent) // Post Route
  .get(StudentsController.getAllStudents); // Get Route

router
  .route("/students/:id") // Entry Route
  .get(StudentsController.getStudentById) // Get by id Route
  .put(StudentsController.updateStudent) // Update by id Route
  .delete(StudentsController.removeStudent); // Delete by id Route

export default router;
