import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Location from './Location';
import ShowCurrentWx from './ShowCurrentWx';
import axios from 'axios';

const apiKeyGoogle = process.env.GEOCODE_API_KEY;;
const apiKeyDarksky = process.env.DARKSKY_API_KEY;;

export default class WeatherApp extends React.Component {
  state = {
    location: {
      address: undefined,
      latitude: undefined,
      longitude: undefined  
    },
    currentWx: undefined,
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
        const darkskyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKeyDarksky}/${this.state.location.latitude},${this.state.location.longitude}`;
        return axios.get(darkskyURL)
      })
      .then((response) => {
        this.setState(() => {
          return {
            currentWx: response.data.currently
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

  // handleGetLocation = (location) => {
  //   if (location) {
  //     const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`;
  //     axios.get(geocodeURL)
  //       .then((response) => {
  //         if (response.data.status === 'ZERO_RESULTS') {
  //           throw ('Unable to find that address');
  //         } else {
  //           this.tempLocation.address = response.data.results[0].formatted_address;
  //           this.tempLocation.latitude = response.data.results[0].geometry.location.lat;
  //           this.tempLocation.longitude = response.data.results[0].geometry.location.lng;
  //           const timestamp = moment().unix().valueOf();
  //           const timezoneURL = `https://maps.googleapis.com/maps/api/timezone/json?location=${this.tempLocation.latitude},${this.tempLocation.longitude}&timestamp=${timestamp}&key=${apiKey}`;
  //           return axios.get(timezoneURL);
  //         }
  //       }).then((response) => {
  //         // only update state if both API requests are successful
  //         this.setState(() => {
  //           return {
  //             location: {
  //               address: this.tempLocation.address,
  //               latitude: this.tempLocation.latitude,
  //               longitude: this.tempLocation.longitude,
  //               timezone: response.data.timeZoneName,
  //               rawOffset: response.data.rawOffset,
  //               dstOffset: response.data.dstOffset  
  //             },
  //             error: undefined
  //           };
  //         });
  //       }).catch((e) => {
  //         let error;
  //         if (e.message === 'Network Error') {
  //           error = 'Unable to connect to API servers';
  //         } else if (e === 'Unable to find that address') {
  //           error = e;
  //         } else {
  //           error = 'Unknown error';
  //         }
  //         this.setState((prevState) => {
  //           return {
  //             location: prevState.location,
  //             error
  //           };
  //         });
  //       })
  //   } else {
  //     this.setState((prevState) => {
  //       return {
  //         location: prevState.location,
  //         error: "Must provide a zipcode, city, or address"
  //       };
  //     });
  //   }
  // }
  render() {
    return (
      <div>
        <Header title="Weather App" subtitle="This is a subtitle" />
        <div className="container">
          <Location handleRequest={this.handleRequest} />
          <ShowCurrentWx 
            location={this.state.location.address}
            current={this.state.currentWx} />
        </div>
        <Footer />
      </div>
    );
  };
}
