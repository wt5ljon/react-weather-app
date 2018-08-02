import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Location from './Location';
import CurrentWx from './CurrentWx';
import axios from 'axios';

const apiKeyGoogle = process.env.GEOCODE_API_KEY;;

export default class WeatherApp extends React.Component {
  state = {
    location: {
      address: undefined,
      latitude: undefined,
      longitude: undefined
    },
    error: undefined
  };

  handleRequest = (location) => {
    if (location) {
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKeyGoogle}`;
      axios.get(geocodeURL)
      .then((response) => {
        this.setState(() => {
          return {
            location: {
              address: response.data.results[0].formatted_address,
              latitude: response.data.results[0].geometry.location.lat,
              longitude: response.data.results[0].geometry.location.lng
            }
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
    } else {
      console.log('No Location Entered');
    }
  };

  componentWillMount() {
    const json = localStorage.getItem('wxLocation');
    const data = JSON.parse(json);
    
    if (data) {
      this.setState(() => {
        return ({
          location: data.location
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
    console.log(this.state.location);
    return (
      <div>
        <Header title="Weather App" subtitle="This is a subtitle" />
        <div className="container">
          <Location 
            handleRequest={this.handleRequest} 
            buttonText={this.state.location.address ? 'Change' : 'Get'} />
          <CurrentWx location={this.state.location} />
        </div>
        <Footer />
      </div>
    );
  };
}
