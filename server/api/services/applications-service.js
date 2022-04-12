import Application from "../models/applications.js";


// Method to add Event 
export const addApplication = (newApplication) => {
    const application = new Application(newApplication);
    return application.save();
};

