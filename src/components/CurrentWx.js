import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getWxIcon } from '../utility/getIcon';

const apiKeyDarksky = process.env.DARKSKY_API_KEY;

export default class CurrentWx extends React.Component {
    state = {
        wxCurrent: null,
        message: ''
    }

    getWxCurrent = () => {
        this.setState(() => {
            return {
                wxCurrent: null,
                message: 'Fetching Current Weather...Please Wait'
            };
        });
        const darkskyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKeyDarksky}/${this.props.location.latitude},${this.props.location.longitude}`;
        axios.get(darkskyURL)
        .then((response) => {
            // console.log('Call');
            this.setState(() => {
                return {
                    wxCurrent: response.data.currently,
                    message: ''
                } 
            });
        })
        .catch((e) => {
            this.setState(() => {
                return {
                    wxCurrent: null,
                    message: e    
                };
            });
        });
    };

    componentWillMount() {
        if (this.props.location) {
            this.getWxCurrent();
        }
    }

    componentDidUpdate(prevProps) {
        // Check if it's a new location, update current Wx if needed
        if (this.props.location && (!prevProps.location || (this.props.location !== prevProps.location))) {
            this.getWxCurrent();
        }
    }

    render() {
        const now = this.state.wxCurrent && moment.unix(this.state.wxCurrent.time);
        return (
            <div className="wxCurrent">
                <h3>{this.props.location ?  this.props.location.address : "No Location Selected"}</h3>
                {this.state.message && <span className="message">{this.state.message}</span>}
                {this.state.wxCurrent && <h3>{now.format('MMM DD, YYYY')} valid at {now.format('hh:mm:ss a')}</h3>}
                {this.state.wxCurrent && <h3><i className={`icon wi wi-${getWxIcon(this.state.wxCurrent.icon)}`}></i></h3>} 
                {this.state.wxCurrent && <h3>{this.state.wxCurrent.summary}</h3>}
                <div className="block">
                    <div className="row__data">
                        {this.state.wxCurrent && <h4>Temperature: {Math.round(this.state.wxCurrent.temperature)}{`\xB0F`}</h4>}
                        {this.state.wxCurrent && <h4>Feels Like: {Math.round(this.state.wxCurrent.apparentTemperature)}{`\xB0F`}</h4>}                                    
                    </div>
                    <div className="row__data">
                        {this.state.wxCurrent && <h4>Dew Point: {Math.round(this.state.wxCurrent.dewPoint)}{`\xB0F`}</h4>}
                        {this.state.wxCurrent && <h4>Humidity: {this.state.wxCurrent.humidity * 100}%</h4>}       
                    </div>
                    <div className="row__data">
                        {this.state.wxCurrent && <h4>Wind Speed: {Math.round(this.state.wxCurrent.windSpeed)} mph (Gust: {Math.round(this.state.wxCurrent.windGust)} mph)</h4>}
                        {this.state.wxCurrent && <h4>Wind Direction: {this.state.wxCurrent.windBearing}{`\xB0`}</h4>}       
                    </div>
                    <div className="row__data">
                        <button className="app-button app-button--block" onClick={this.getWxCurrent}>Update Current Weather</button>
                        <Link to="/forecast" className="link">Get 7-Day Forecast</Link>
                    </div>
                </div> 
            </div>
        );    
    }
}
