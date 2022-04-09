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



 export const getAllEvents = async (request, response) => {
    try {
        const event = await eventsService.getEvents();
        setSuccessResponse(event, response);
      } catch (error) {
        setErrorResponse(error, response);
      }
};


//Get method to fetch existing event from the DB based on id
export const get = async (request, response) => {
    try {
      const id = request.params.id;
      const event = await eventsService.get(id);
      setSuccessResponse(event, response);
    } catch (error) {
        error.message = 'Invalid Task ID requested';
        error.status = 400;
        setErrorResponse(error, response);
    }
}


//PUT method to update existing event in the Db
export const update = async (request, response) => {
    try {
      const id = request.params.id;
      const updated = {...request.body}; // fetching the fields to be updated from the request body
      updated.id = id;
      const event = await eventsService.update(updated, {new : true});
      setSuccessResponse(event, response);
    } catch (error) {
      error.message = 'Something went wrong. Check the request body';
      error.status = 500;
      setErrorResponse(error, response);
    }
}
