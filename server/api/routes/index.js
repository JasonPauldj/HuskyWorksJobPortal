import jobsRouter from "./jobs-router.js";
import studentsRouter from "./students-router.js";
import recruiterRouter from "./recruiters-router.js";
import OrganizationRouter from "./organizations-router.js";

// Exporting the routes using a default route
export default (app) => {
  app.use("/", jobsRouter);
  app.use("/", studentsRouter);
  app.use("/", recruiterRouter);
  app.use("/", OrganizationRouter);
};
