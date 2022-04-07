import mongoose from "mongoose";

//Student Schema
const studentSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    student_type :{
        type : String,
        required : true,
        enum: ["GRAD","UNDER_GRAD"]
    },
    nuid :{
        type : String,
        required : true,
        trim: true
    },
    gpa :{
        type: mongoose.Schema.Types.Decimal128,
        required : true
    },
    major : {
        type: String,
        required : true
    },
    email :{
        type: String,
        required : true,
        match:  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    }
});

//Student Model
const studentModel = mongoose.model("student", studentSchema);

export default studentModel;