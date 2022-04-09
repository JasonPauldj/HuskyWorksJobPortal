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

//fetch an event based on id
export const get = (id) => {
    const event =  Event.findById(id).exec();
    return event;
}

//update a task
export const update = (updatedEvent) => {
    // updatedEvent.lastModifiedDate = new Date();
    const event =  Event.findByIdAndUpdate(updatedEvent.id, updatedEvent, { new : true }).exec();
    return event;
}
