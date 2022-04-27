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

// Method to post event using the post method
export const createEvent = async (request, response) => {
  try {
    const payload = request.body;
    const event = await eventsService.addEvent(payload);
    setSuccessResponse(event, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// Method to get all events 
export const getAllEvents = async (request, response) => {
  try {
    const recruiterId = request.query.recruiter_id;
    const event_type = request.query.event_type
      ? request.query.event_type.split(";")
      : undefined;
    const search = request.query.searchText;
    const query = {};
    if (recruiterId) {
      query.recruiter_id = recruiterId;
    }
    if (event_type) {
      query.event_type = event_type;
    }
    if (search) {
      query.event_title = { $regex: search, $options: "i" };
    }
    //when searched
    // by query parameters, returns the events requested
    if (query) {
      const events = await eventsService.filter(query);
      setSuccessResponse(events, response);
    }
    //returns all existing tasks when no query parameters are requested
    else {
      const events = await eventsService.getEvents();
      setSuccessResponse(events, response);
    }
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
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setErrorResponse(error, response);
  }
};

//PUT method to update existing event in the Db
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updated = { ...request.body }; // fetching the fields to be updated from the request body
    updated.id = id;
    const event = await eventsService.update(updated, { new: true });
    setSuccessResponse(event, response);
  } catch (error) {
    error.message = "Something went wrong. Check the request body";
    error.status = 500;
    setErrorResponse(error, response);
  }
};

//Delete method to remove existing event from the DB
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const event = await eventsService.remove(id);
    setSuccessResponse(
      { message: `Successfully Removed Event ${id}` },
      response
    );
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setErrorResponse(error, response);
  }
};

// Method to get applications by student id
export const getEventsByStudentId = async (request, response) => {
  try {
    const id = request.params.id; // student_id
    //getall events
    const eventsAll = await eventsService.getEvents();
    // filter by id
    console.log(eventsAll);
    const eventsByStudentId = eventsAll.filter(
      (event) => event.student_id === id
    );
    const eventIds = eventsByStudentId.map((event) => event._id);
    // call events now
    const promises = eventIds.map((eventId) => {
      return getEventById(eventId);
    });
    console.log(promises, "promises");

    let events = await Promise.all(promises);
    setSuccessResponse(events, response);
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setErrorResponse(error, response);
  }
};

const getEventById = async (eventId) => {
  const event = await eventsService.get(eventId);
  return event;
};
