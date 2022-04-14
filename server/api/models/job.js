import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  job_status: {
    type: String,
    enum: ["ACTIVE", "CLOSED"],
    default: "ACTIVE",
  },
  job_title: {
    type: String,
    required: "Job title is required.",
  },
  job_description: {
    type: String,
    required: "Job description is required.",
  },
  job_responsibilities: {
    type: String,
    required: "Job responsibilities are required.",
  },
  job_type: {
    type: String,
    enum: ["FULLTIME", "PARTTIME", "INTERNSHIP"],
    default: "INTERNSHIP",
  },
  job_location: {
    type: String,
    required: "Job location is required",
  },
  job_salary: {
    type: Number,
    required: "Salary is required.",
  },
  job_category: {
    type: String,
    enum: ["SOFTWARE", "ELECTRICAL", "MECHANICAL"],
    default: "SOFTWARE",
  },
  degree_level: {
    type: String,
    enum: ["UNDERGRADUATE", "GRADUATE"],
    default: "GRADUATE",
  },
  job_deadline: {
    type: Date,
    required: "Job deadline is required.",
  },
  job_duration: {
    type: Number,
    required: "Job duration is required.",
  },
  recruiterId: {
    type: Number,
    required: "Recruiter id is required.",
  },
  organization_id: {
    type: Number,
    required: "Organization id is required.",
  },
  job_post_date: {
    type: Date,
    default: Date.now(),
  },
});

// Creating model from the schema using mongoose
const jobModel = mongoose.model("job", jobSchema);
// Exporting the model
export default jobModel;

// // To convert id into a hex string
// Schema.virtual("id", () => this._id.toHexString());
// // To convert our schema to json object for readability
// Schema.set("toJSON", { virtuals: true });
