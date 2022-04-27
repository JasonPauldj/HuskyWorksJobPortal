import mongoose from "mongoose";

//Review Schema
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required.",
  },
  organizationId: {
    type: String,
    required: "OrganizationId is required.",
  },
  review: {
    type: String,
    required: true,
  },
});

//Recruiter Model
const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
