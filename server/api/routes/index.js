import jobsRouter from "./jobs-router.js";

// Exporting the routes using a default route
export default (app) => {
  app.use("/", jobsRouter);
};
