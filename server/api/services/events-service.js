import Event from "../models/event.js";

// Method to add Event 
export const addEvent = (newEvent) => {
    const event = new Event(newEvent);
    return event.save();
  };