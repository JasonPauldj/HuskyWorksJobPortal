import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  event_title: {
    type: String,
    default: "Event title is required",
  },
  event_organizer: {
    type: String,
    required: "Event organizer is required.",
  },
  event_type: {
    type: String,
    enum: ["NETWORKING", "CAREER FAIR", "WORKSHOP"],
    required: "Event type is required.",
  },
  event_location: {
    type: String,
    required: "Event location is required.",
  },
  event_description: {
    type: String,
    required: "Event description is required.",
  },
  no_of_seats: {
    type: Number,
    required: "No of seats is required.",
  },
  event_date: {
    type: Date,
    required: "Date of the Event is required.",
  },
  event_post_date: {
    type: Date,
    default: Date.now(),
  },
});

// Creating model from the schema using mongoose
const eventModel = mongoose.model("event", jobSchema);
// Exporting the model
export default eventModel;


