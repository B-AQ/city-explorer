import React from "react";

class LatLon extends React.Component {
  render() {
    return (
      <>
        <h2>Welcome to {this.props.city}</h2>
        <p>
          {this.props.city} is located at {this.props.lat} by {this.props.lon}
        </p>
      </>
    );
  }
}

export default LatLon;
