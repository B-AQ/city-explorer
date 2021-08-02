import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLocation: {},
    };
  }

  formSubmition = async (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    const result = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_TQ_TOKEN}&q=${location}&format=json`
    );

    this.setState({
      dataLocation: result.data[0],
    });

  };
  render() {
    return (
      <div>
        <form onSubmit={this.formSubmition}>
          <label>Add Location</label>
          <br />
          <input
            type="text"
            placeholder="enter your location"
            name="location"
          />
          <br />
          <input type="submit" placeholder="Explore" />
        </form>

        <div>
          <h4>Location Information:- </h4>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              {this.state.dataLocation.display_name && (
                <p>City: {this.state.dataLocation.display_name}</p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              {this.state.dataLocation.lat && (
                <p>Latitude {this.state.dataLocation.lat}</p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              {this.state.dataLocation.lon && (
                <p>Longitude {this.state.dataLocation.lon}</p>
              )}
            </ListGroup.Item>
          </ListGroup>
        </div>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_TQ_TOKEN}&center=${this.state.dataLocation.lat},${this.state.dataLocation.lon}&zoom=1-18`}
          alt="map" roundedCircle  />
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default App;
