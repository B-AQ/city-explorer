import React from "react";
// import axios from 'axios';

class weather extends React.Component {
  render() {
    return this.props.weather.map((day, index) => (
      <div key={index}>
        <p>Date : {day.dateTime}</p>

        <p>Description : {day.description}</p>
      </div>
    ));
  }
}

export default weather;
