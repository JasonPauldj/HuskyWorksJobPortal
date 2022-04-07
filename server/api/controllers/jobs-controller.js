import * as jobsService from "./../services/jobs-service.js";

// Setting Error Response for any errors
const setErrorResponse = (err, res) => {
  res.status(500);
  res.json(err);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

// Method to post job using the post service
export const postJob = async (req, res) => {
  try {
    const payload = req.body;
    const job = await jobsService.addJob(payload);
    setSuccessResponse(job, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get jobs using the get service
export const getAllJobs = async (req, res) => {
  try {
    const job = await jobsService.getJobs();
    setSuccessResponse(job, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get job by id using the getById service
export const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobsService.getJobById(id);
    setSuccessResponse(job, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update job using the update service
export const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = { ...req.body };
    updated.id = id;
    // We pass the updated object to the service
    const job = await jobsService.updateJob(updated);
    setSuccessResponse(job, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove job using the remove service
export const removeJob = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobsService.removeJob(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The job with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};