import Event from "../models/event.js";

// Method to add Event 
export const addEvent = (newEvent) => {
    const event = new Event(newEvent);
    return event.save();
  };


export const getEvents = () => {
    const events =  Event.find().exec();
    return events;
}

export const filter = (query) => {
    const params = {...query};
    const events =  Event.find(params).exec();
    return events;
}