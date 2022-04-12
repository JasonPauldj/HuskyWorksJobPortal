import * as ApplicationsService from "./../services/applications-service.js";

// Setting Error Response for any errors
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
};

export const createApplication = async (request, response) => {
    try {
      const payload = request.body;
      const application = await ApplicationsService.addApplication(payload);
      
      setSuccessResponse(application, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
};



export const getAllApplications = async (request, response) => {
    try{
    const status = request.query.status;
    const query =  {};
    if(status) {
        query.status = status;
    }
    //when searched by query parameters, returns the events requested
    if(query) {
      const applications = await ApplicationsService.filter(query);
      setSuccessResponse(applications, response);
    } 
    //returns all existing tasks when no query parameters are requested
    else {
        const applications = await ApplicationsService.getApplications();
        setSuccessResponse(applications, response);
    }
    } catch (error) {
        setErrorResponse(error, response);
    }
};


