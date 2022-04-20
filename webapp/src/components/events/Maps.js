import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Maps extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: "60%", height: "40%" }}
        zoom={15}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng,
        }}
      >
        <Marker
          position={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(
  Maps
);
