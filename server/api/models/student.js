import mongoose from "mongoose";

//Student Schema
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
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
  interests: {
    type: String
  },
  nuid: {
    type: String,
    required: true,
    trim: true,
  },
  gpa: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  resumeKey: {
    type: String,
  },
});

//Student Model
const studentModel = mongoose.model("student", studentSchema);

export default studentModel;
