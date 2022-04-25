import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "../../components/events/EventCard.js";
import FilterSectionComponent from "../../components/genericComponent/FIlterSectionComponent.js";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent.js";
import Navbar from "../../components/navbar/Navbar.js";
import classes from "./EventsPage.module.scss";
import SearchBar from "../../components/genericComponent/SearchBar";

const EVENT_TYPE_FILTERS = ["NETWORKING", "CAREER FAIR", "WORKSHOP"];
let isInitial = true;

function EventsPage() {
  const [appliedEventTypeFilters, setEventTypeFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);

  //getting all events when the component is rendered for the first Time
  useEffect(() => {
    if (isInitial) {
      const fetchEvents = async () => {
        const res = await axios.get("http://localhost:9000/events");
        setEvents(res.data);
      };

      fetchEvents();
    } else {
      isInitial = false;
    }
  }, []);

  const fetchEvents = async (url) => {
    const res = await axios.get(url);
    setEvents(res.data);
  };

  //filtering events when the filters are changed
  useEffect(() => {
    let url = "http://localhost:9000/events";
    let params = [];
    let eventTypeQueryParam = "";

    //checking if event type filters are selected
    if (appliedEventTypeFilters.length > 0) {
      appliedEventTypeFilters.forEach((eventTypeValue) => {
        eventTypeQueryParam += `${eventTypeValue};`;
      });
    }

    if (eventTypeQueryParam.length > 0) {
      params.push({
        paramName: "event_type",
        paramValue: eventTypeQueryParam.slice(
          0,
          eventTypeQueryParam.length - 1
        ),
      });
    }

    if (searchText.length > 0) {
      params.push({ paramName: "searchText", paramValue: searchText });
      // url+=`&searchText=${searchText}`
    }

    if (params.length > 0) {
      params.forEach((param, index) => {
        if (index === 0) {
          url += `?${param.paramName}=${param.paramValue}`;
        } else {
          url += `&${param.paramName}=${param.paramValue}`;
        }
      });
    }

    fetchEvents(url);
  }, [appliedEventTypeFilters, searchText]);

  const eventCards = events.map((event) => {
    return <EventCard key={event._id} event={event} />;
  });

  const isEventTypeSelected = (eventTypeValue) =>
    appliedEventTypeFilters.includes(eventTypeValue);

  const handleEventTypeCheckboxChange = (eventTypeValue) => {
    let updatedEventTypeFilters;

    //the filter was selected, remove it from appliedFilters
    if (isEventTypeSelected(eventTypeValue)) {
      updatedEventTypeFilters = appliedEventTypeFilters.filter(
        (ETV) => ETV !== eventTypeValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedEventTypeFilters = [...appliedEventTypeFilters, eventTypeValue];
    }
    setEventTypeFilters(updatedEventTypeFilters);
  };

  const handleSearchInputChange = (searchInput) => {
    setSearchText(searchInput);
  };
  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-3-1-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-3-1-bd-sec-right">
          <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
            <div className="ly-1-3-1-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              <div>
                <SearchBar
                  id="search-jobs"
                  placeholder="Search for Job or Organization"
                  label="Search for Job or Organization"
                  onSearchInputChange={handleSearchInputChange}
                />
              </div>
              <div className={classes.eventsContainer}>{eventCards}</div>
            </div>
            <div className="ly-1-3-1-bd-sec-right-sidebar">
              {/*HERE IS WHERE YOUR RIGHT CONTENT SHOULD GO*/}
              <CardComponent className="ht-full-percent wt-80-percent">
                <FilterSectionComponent
                  heading={"EVENT TYPE"}
                  values={EVENT_TYPE_FILTERS}
                  isChecked={isEventTypeSelected}
                  handleCheckboxChange={handleEventTypeCheckboxChange}
                />
              </CardComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
