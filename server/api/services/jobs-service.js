import Job from "../models/job.js";

// Method to add job to db
export const addJob = (newJob) => {
  const job = new Job(newJob);
  return job.save();
};

export const filter = (query) => {
  const params = { ...query };
  const jobs = Job.find(params).exec();
  return jobs;
};
// Method to get all jobs at once from db
export const getJobs = () => {
  const jobs = Job.find({}).exec();
  return jobs; // returns a promise
};

// Method to get a specific job by id from db
export const getJobById = (id) => {
  const job = Job.findById(id).exec();
  return job; // returns a promise
};

// Method to update a specific job by id in db
export const updateJob = (updatedJob) => {
  updatedJob.modifiedDate = new Date();
  const job = Job.findByIdAndUpdate(updatedJob.id, updatedJob, {
    new: true,
  }).exec();
  return job; // returns a promise
};

// Method to delete a specific job by id from db
export const removeJob = (id) => {
  const job = Job.findByIdAndDelete(id).exec();
  return job; // returns a promise
};
