import Organization from "../models/organization.js";

// Method to add Organization to db
export const addOrganization = (newOrganization) => {
    const organization = new Organization(newOrganization);
    return organization.save();
  };
  
  // Method to get all Organizations at once from db
  export const getOrganizations = () => {
    const organizations = Organization.find({}).exec();
    return organizations; // returns a promise
  };
  
  // Method to get a specific Organization by id from db
  export const getOrganizationById = (id) => {
    const organization = Organization.findById(id).exec();
    return organization; // returns a promise
  };
  
  // Method to update a specific Organization by id in db
  export const updateOrganization = (updatedOrganization) => {
    const organization = Organization.findByIdAndUpdate(updatedOrganization.id, updatedOrganization, {new:true}).exec();
    return organization; // returns a promise
  };
  
  // Method to delete a specific Organization by id from db
  export const removeOrganization = (id) => {
    const organization = Organization.findByIdAndDelete(id).exec();
    return organization; // returns a promise
  };