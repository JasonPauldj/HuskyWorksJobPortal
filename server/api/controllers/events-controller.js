import * as eventsService from "./../services/events-service.js";

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

export const createEvent = async (request, response) => {
    try {
      const payload = request.body;
      const event = await eventsService.addEvent(payload);
      setSuccessResponse(event, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
  };