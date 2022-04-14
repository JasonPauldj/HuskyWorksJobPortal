import mongoose from "mongoose";

//Review Schema
const reviewSchema = new mongoose.Schema({
    nuid: {
        type: String,
        required: "Student id is required."
    },
    organizationId : {
        type : Number,
        required : true
    },
    review : {
        type : String,
        required : true
    }
});

//Recruiter Model
const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;