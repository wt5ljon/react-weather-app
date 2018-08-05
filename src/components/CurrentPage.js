import React from 'react';
import Header from './Header';
import Location from './Location';
import CurrentWx from './CurrentWx';
import axios from 'axios';

const apiKeyGoogle = process.env.GEOCODE_API_KEY;;

export default class CurrentPage extends React.Component {
  state = {
    location: null,
    error: ''
  };

  handleRequest = (location) => {
    if (location) {
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKeyGoogle}`;
      axios.get(geocodeURL)
      .then((response) => {
        if (response.data.status === 'OK') {
          this.setState(() => {
            return {
              location: {
                address: response.data.results[0].formatted_address,
                latitude: response.data.results[0].geometry.location.lat,
                longitude: response.data.results[0].geometry.location.lng
              },
              error: ''
            };
          });
        } else {
          this.setState((prevState) => {
            return {
              location: prevState.location,
              error: response.data.status
            };
          });
        }
      })
      .catch((e) => {
        this.setState((prevState) => {
          return {
            location: prevState.location,
            error: 'Server Not Available'
          };
        });
      });
    } else {
      this.setState((prevState) => {
        return {
          location: prevState.location,
          error: 'No Location Entered'
        };
      });
    }
  };

  handleInputChange = () => {
    this.setState((prevState) => {
      return {
        location: prevState.location,
        error: ''
      };
    });
  };

  componentWillMount() {
    const json = localStorage.getItem('wxLocation');
    const data = JSON.parse(json);
    
    if (data) {
      this.setState(() => {
        return ({
          location: data.location,
        });
      });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify({
      location: this.state.location 
    });
    localStorage.setItem('wxLocation', json);
  }

  render() {
    return (
      <div>
        <Header title="Weather App" subtitle="Current Conditions" />
        <div className="container">
          <Location 
            handleRequest={this.handleRequest} 
            onInputChange={this.handleInputChange}
            buttonText={this.state.location ? 'Change' : 'Get'} />
          {this.state.error && <span className="message">Error: {this.state.error}</span>}
          {this.state.location && <CurrentWx location={this.state.location}  />}
        </div>
      </div>
    );
  };
}
