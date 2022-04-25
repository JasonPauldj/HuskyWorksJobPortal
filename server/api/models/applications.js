import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  document_id: {
    type: String,
    required: "Document id is required.",
  },
  status: {
    type: String,
    enum: ["APPLIED", "ACCEPTED", "APPROVED"],
    required: "Status is required.",
  },
  job_id: {
    type: String,
    required: "Job Id is required.",
  },
  student_id: {
    type: String,
    required: "Student Id is required.",
  },
  application_date: {
    type: Date,
    default: Date.now(),
  },
  last_modified_date: {
    type: Date,
    default: Date.now(),
  },
});

// Creating model from the schema using mongoose
const applicationModel = mongoose.model("applications", applicationSchema);
// Exporting the model
export default applicationModel;
