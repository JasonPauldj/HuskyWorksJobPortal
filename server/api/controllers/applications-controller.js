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


