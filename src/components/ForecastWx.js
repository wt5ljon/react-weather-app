import React from 'react';
import axios from 'axios';
import ForecastItem from './ForecastItem';
import { Link } from 'react-router-dom';

const apiKeyDarksky = process.env.DARKSKY_API_KEY;

export default class ForecastWx extends React.Component {
    state = {
        forecast: null,
        message: ''
    }

    getWxForecast = () => {
        this.setState(() => {
            return {
                forecast: null,
                message: 'Fetching Forecast...Please Wait'
            };
        });
        const darkskyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKeyDarksky}/${this.props.location.latitude},${this.props.location.longitude}`;
        // console.log('Call');
        axios.get(darkskyURL)
        .then((response) => {
            // console.log('Call');
            this.setState(() => {
                return {
                    forecast: response.data.daily,
                    message: ''
                } 
            });
        })
        .catch((e) => {
            this.setState(() => {
                return {
                    forecast: null,
                    message: e    
                };
            });
        });
    };

    componentWillMount() {
        if (this.props.location) {
            this.getWxForecast();
        }
    }

    render() {
        console.log(this.state.forecast);
        return (
            <div>
                <div className="forecast__row">
                    <span className="forecast__header">Forecast for {this.props.location.address}</span>
                    <Link to="/" className="forecast__link">Go To Current Conditions</Link>
                </div>
                {this.state.forecast && this.state.forecast.data.slice(1).map(day => <ForecastItem key={day.time} data={day} />)}
            </div>
        );
    }
}