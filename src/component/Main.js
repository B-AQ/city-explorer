import React from "react";
import axios from "axios";
import Weather from "../component/Weather";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/Card";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLocation: {},
      displayDataMap: false,
      errorMsg: false,
      message: "",
      weather: [],
      latitude: "",
      longitude: "",
      searchQuery: "",
      forecastData: [],
      movieData: [],
    };
  }

  formLocationSubmition = async (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    const result = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_TQ_TOKEN}&q=${location}&format=json`
    );
    const locationIq = result.data[0];
    const forecast = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/weather-bit?latitude=${locationIq.lat}&longitude=${locationIq.lon}`
    );
    const movieDb = result.data[0].display_name;
    const movie = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/movie?query=${movieDb}`
    );
    try {
      this.setState({
        dataLocation: result.data[0],
        displayDataMap: true,
        forecastData: forecast.data,
        movieDataresults: movieDb,
        movieData: movie.data,
      });
      await this.getWeatherCondition(location);
    } catch {
      this.setState({
        errorMsg: true,
      });
    }
  };

  getWeatherCondition = async (searchQuery) => {
    try {
      let weather = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/weather`,
        { params: { searchQuery: searchQuery } }
      );
      this.setState({
        weather: weather.data,
      });
    } catch (e) {
      this.setState({
        displayDataMap: false,
        errorMsg: true,
        message: "Insert a city first",
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.formLocationSubmition}>
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
          {this.state.displayDataMap && (
            <div>
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
              <div>
                <Container>
                  <Row>
                    <Col xs={6} md={4}>
                      <Image
                        src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_TQ_TOKEN}&center=${this.state.dataLocation.lat},${this.state.dataLocation.lon}&zoom=1-18`}
                        alt="map"
                        roundedCircle
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
              <div>
                <Container>
                  <Row>
                    <Col xs={6} md={4}>
                      <Weather weather={this.state.weather} />
                    </Col>
                  </Row>
                </Container>
                {this.state.errorMsg && this.state.message}
              </div>
            </div>
          )}
          {this.state.forecastData &&
            this.state.forecastData.map((weather) => {
              return (
                <Container>
                  <Row>
                    <Col xs>Weather Bit Forecast</Col>
                    <Col xs={{ order: 12 }}>{weather.date}</Col>
                    <Col xs={{ order: 1 }}>{weather.description}</Col>
                  </Row>
                </Container>
              );
            })}
          {this.state.movieData &&
            this.state.movieData.map((data) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={data.poster_path} alt="movie" />
                  <Card.Body>
                    <Card.Title>Title:{data.title}</Card.Title>
                    <Card.Text>Overview:{data.overview}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Average Votes:{data.vote_average}
                    </ListGroupItem>
                    <ListGroupItem>
                      Total Votes:{data.total_votes}
                    </ListGroupItem>
                    <ListGroupItem>Popularity:{data.popularity}</ListGroupItem>
                    <ListGroupItem>Released:{data.release_date}</ListGroupItem>
                  </ListGroup>
                </Card>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Main;
