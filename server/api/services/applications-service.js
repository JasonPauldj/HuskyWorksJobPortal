import Application from "../models/applications.js";


// Method to add Event 
export const addApplication = (newApplication) => {
    const application = new Application(newApplication);
    return application.save();
};

export const getApplications = () => {
    const applications =  Application.find().exec();
    return applications;
}

export const filter = (query) => {
    const params = {...query};
    const applications =  Application.find(params).exec();
    return applications;
}

//fetch an application based on id
export const get = (id) => {
    const application =  Application.findById(id).exec();
    return application;
}

//update an application status
export const update = (updatedApplication) => {
    updatedApplication.last_modified_date = new Date();
    const application =  Application.findByIdAndUpdate(updatedApplication.id, updatedApplication, { new : true }).exec();
    return application;
}
