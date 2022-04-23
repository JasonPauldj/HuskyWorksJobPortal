import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  student_id:{
        type: Number,
        required: "Id is required.",
  },
  university: {
    type: String,
    default: "University name is required.",
  },
  start_date: {
    type: Date,
    required: "Start date is required.",
  },
  end_date: {
    type: Date,
    required: "End date is required.",
  },
  location: {
    type: String,
    required: "Location is required.",
  },
  major: {
    type: String,
    required: "Description is required.",
  },
  gpa :{
    type: mongoose.Schema.Types.Decimal128,
    required : true
},
});

// Creating model from the schema using mongoose
const educationModel = mongoose.model("education", educationSchema);
// Exporting the model
export default educationModel;