import mongoose from "mongoose";
//organization schema
const orgSchema = new mongoose.Schema({
  organizationLogo: {
    type: String,
  },
  organizationName: {
    type: String,
    required: "Organization name is required.",
  },
  aboutUs: {
    type: String,
  },
  sponsorship: {
    type: Boolean,
    required: "Please specify if the organization provides sponsorship",
  },
});

//Organization Model
const orgModel = mongoose.model("organization", orgSchema);

export default orgModel;
