import Event from "../models/event.js";

// Method to add Event
export const addEvent = (newEvent) => {
  const event = new Event(newEvent);
  return event.save();
};

// Method to get Event
export const getEvents = () => {
  const events = Event.find({}).exec();
  return events;
};

// Method to filter Event
export const filter = (query) => {
  const params = { ...query };
  const events = Event.find(params).exec();
  return events;
};

//fetch an event based on id
export const get = (id) => {
  const event = Event.findById(id).exec();
  return event;
};

//update an event
export const update = (updatedEvent) => {
  // updatedEvent.lastModifiedDate = new Date();
  const event = Event.findByIdAndUpdate(updatedEvent.id, updatedEvent, {
    new: true,
  }).exec();
  return event;
};

//delete an event
export const remove = (id) => {
  const event = Event.findByIdAndDelete(id).exec();
  return event;
};
