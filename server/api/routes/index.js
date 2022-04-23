import jobsRouter from "./jobs-router.js";
import studentsRouter from "./students-router.js";
import eventsRouter from "./events-router.js";
import applicationsRouter from "./applications-router.js";
import recruiterRouter from "./recruiters-router.js";
import OrganizationRouter from "./organizations-router.js";
import ReviewRouter from "./reviews-router.js";
import experienceRouter from "./experiences-router.js";
import projectRouter from "./projects-router.js";
import educationRouter from "./educations-router.js";

// Exporting the routes using a default route
export default (app) => {
  app.use("/", jobsRouter);
  app.use("/", studentsRouter);
  app.use("/", eventsRouter);
  app.use("/", applicationsRouter);
  app.use("/", recruiterRouter);
  app.use("/", OrganizationRouter);
  app.use("/", ReviewRouter);
  app.use("/", experienceRouter);
  app.use("/", projectRouter);
  app.use("/", educationRouter);
};
