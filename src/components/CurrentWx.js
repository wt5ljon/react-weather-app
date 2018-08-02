import React from 'react';
import moment from 'moment';
import axios from 'axios';

const apiKeyDarksky = process.env.DARKSKY_API_KEY;

export default class CurrentWx extends React.Component {
    state = {
        wxCurrent: null
    };

    getIcon = (icon) => {
        const iconMapping = {
            'clear-day': 'day-sunny',
            'clear-night': 'night-clear',
            'rain': 'rain',
            'snow': 'snow',
            'sleet': 'sleet',
            'wind': 'strong-wind',
            'fog': 'fog',
            'cloudy': 'cloudy',
            'partly-cloudy-day': 'day-cloudy',
            'partly-cloudy-night': 'night-cloudy',
            'hail': 'hail',
            'thunderstorm': 'thunderstorm',
            'tornado': 'tornado'
        };
        return iconMapping[icon];
    };

    getWxCurrent = () => {
        const darkskyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKeyDarksky}/${this.props.location.latitude},${this.props.location.longitude}`;
        axios.get(darkskyURL)
        .then((response) => {
            this.setState(() => {
                return {
                    wxCurrent: response.data.currently
                }
            });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    componentWillMount() {
        const json = localStorage.getItem('wxCurrent');
        const data = JSON.parse(json);
        
        if (data) {
          this.setState(() => {
            return ({
              wxCurrent: data
            });
          });
        }
    }
    
    componentDidUpdate() {
        const json = JSON.stringify(this.state.currentWx);
        localStorage.setItem('wxCurrent', json);
    }

    render() {
        console.log(this.state.currentWx);
        return (
            <div className="wxCurrent">
                <button onClick={this.getWxCurrent}>Update Current Weather</button>
                <h3>{this.props.location.address ?  `Current Conditions for ${this.props.location.address}` : 'No Location Selected'}</h3>
                {!this.state.wxCurrent && <h3>No current conditions to show - Click 'Update' button to refresh</h3>}
                {this.state.wxCurrent && <h3>Time: {moment.unix(this.state.wxCurrent.time).format('MMM DD YYYY, hh:mm:ss a')}</h3>}
                {this.state.wxCurrent && <h3>Weather: {this.state.wxCurrent.summary}</h3>}
                {this.state.wxCurrent && <h3>Temperature: {Math.round(this.state.wxCurrent.temperature)}{`\xB0F`}</h3>}
                {this.state.wxCurrent && <h3>Feels Like: {Math.round(this.state.wxCurrent.apparentTemperature)}{`\xB0F`}</h3>}            
                {this.state.wxCurrent && <h3>Dew Point: {Math.round(this.state.wxCurrent.dewPoint)}{`\xB0F`}</h3>}
                {this.state.wxCurrent && <h3>Humidity: {this.state.wxCurrent.humidity * 100}%</h3>}
                {this.state.wxCurrent && <h3>Wind Speed: {Math.round(this.state.wxCurrent.windSpeed)} mph</h3>}
                {this.state.wxCurrent && <h3>Gusts: {Math.round(this.state.wxCurrent.windGust)} mph</h3>}
                {this.state.wxCurrent && <h3>Wind Direction: {this.state.wxCurrent.windBearing}{`\xB0`}</h3>}
                {this.state.wxCurrent && <i className={`wi wi-${this.getIcon(this.state.wxCurrent.icon)}`}></i>}            
            </div>
        );    
    }
}
