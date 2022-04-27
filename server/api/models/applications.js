import mongoose from "mongoose";

//Application schema/model
const applicationSchema = new mongoose.Schema({
  document_id: {
    type: String,
    required: "Document id is required.",
  },
  status: {
    type: String,
    enum: ["APPLIED", "INTERVIEWING", "ACCEPTED", "REJECTED"],
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
  student_name: {
    type: String
  },
  student_major: {
    type: String
  },
  student_gpa: {
    type: mongoose.Schema.Types.Decimal128,
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
