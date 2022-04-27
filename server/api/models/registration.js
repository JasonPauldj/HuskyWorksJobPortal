import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: "Job Id is required.",
  },
  student_id: {
    type: String,
    required: "Student Id is required.",
  },
  registration_date: {
    type: Date,
    default: Date.now(),
  },
  last_modified_date: {
    type: Date,
    default: Date.now(),
  },
});

// Creating model from the schema using mongoose
const registrationModel = mongoose.model("registrations", registrationSchema);
// Exporting the model
export default registrationModel;
