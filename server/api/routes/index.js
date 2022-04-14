import jobsRouter from "./jobs-router.js";
import studentsRouter from "./students-router.js";
import eventsRouter from "./events-router.js";
import applicationsRouter from "./applications-router.js";


// Exporting the routes using a default route
export default (app) => {
  app.use("/", jobsRouter);
  app.use("/", studentsRouter);
  app.use("/", eventsRouter);
  app.use("/", applicationsRouter);
};
