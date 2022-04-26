import mongoose from "mongoose";

//Recruiter Schema
const recruiterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: "Organization id is required.",
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
});

//Recruiter Model
const recruiterModel = mongoose.model("recruiter", recruiterSchema);

export default recruiterModel;
