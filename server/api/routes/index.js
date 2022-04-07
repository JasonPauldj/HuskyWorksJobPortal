import jobsRouter from "./jobs-router.js";
import studentsRouter from "./students-router.js";

// Exporting the routes using a default route
export default (app) => {
  app.use("/", jobsRouter);
  app.use("/", studentsRouter);
};
