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


//Get method to fetch existing application from the DB based on id
export const getApplication = async (request, response) => {
    try {
      const id = request.params.id;
      const application = await ApplicationsService.get(id);
      setSuccessResponse(application, response);
    } catch (error) {
        error.message = 'Invalid Event ID requested';
        error.status = 400;
        setErrorResponse(error, response);
    }
}

//PUT method to update existing application in the Db
export const update = async (request, response) => {
    try {
      const id = request.params.id;
      const updated = {...request.body}; // fetching the fields to be updated from the request body
      updated.id = id;
      const application = await ApplicationsService.update(updated, {new : true});
      setSuccessResponse(application, response);
    } catch (error) {
      error.message = 'Something went wrong. Check the request body';
      error.status = 500;
      setErrorResponse(error, response);
    }
}

