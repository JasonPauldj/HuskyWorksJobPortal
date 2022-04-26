import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  student_id:{
    type: String,
    required: "Id is required.",
  },
  project_title: {
    type: String,
    required: "Title is required.",
  },
  location: {
    type: String,
  },
  start_date: {
    type: Date,
    required: "Start date is required.",
  },
  end_date: {
    type: Date,
    required: "End date is required.",
  },
  project_description: {
    type: String,
    required: "Description is required.",
  },
});

// Creating model from the schema using mongoose
const projectModel = mongoose.model("project", projectSchema);
// Exporting the model
export default projectModel;