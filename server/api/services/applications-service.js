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
