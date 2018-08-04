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
        // const jsonForecast = {"summary":"Light rain throughout the week, with high temperatures bottoming out at 85°F on Monday.","icon":"rain","data":[{"time":1533268800,"summary":"Humid and partly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1533293233,"sunsetTime":1533341539,"moonPhase":0.72,"precipIntensity":0.0035,"precipIntensityMax":0.0264,"precipIntensityMaxTime":1533304800,"precipProbability":0.25,"precipType":"rain","temperatureHigh":87.16,"temperatureHighTime":1533322800,"temperatureLow":79.42,"temperatureLowTime":1533373200,"apparentTemperatureHigh":96.58,"apparentTemperatureHighTime":1533319200,"apparentTemperatureLow":83.23,"apparentTemperatureLowTime":1533373200,"dewPoint":75.32,"humidity":0.77,"pressure":1019.32,"windSpeed":9.62,"windGust":16.42,"windGustTime":1533312000,"windBearing":129,"cloudCover":0.41,"uvIndex":9,"uvIndexTime":1533315600,"visibility":10,"ozone":292.26,"temperatureMin":80.15,"temperatureMinTime":1533283200,"temperatureMax":87.16,"temperatureMaxTime":1533322800,"apparentTemperatureMin":86.26,"apparentTemperatureMinTime":1533283200,"apparentTemperatureMax":96.58,"apparentTemperatureMaxTime":1533319200},{"time":1533355200,"summary":"Humid throughout the day and partly cloudy until afternoon.","icon":"partly-cloudy-day","sunriseTime":1533379667,"sunsetTime":1533427897,"moonPhase":0.75,"precipIntensity":0.0004,"precipIntensityMax":0.0016,"precipIntensityMaxTime":1533402000,"precipProbability":0.1,"precipType":"rain","temperatureHigh":86.65,"temperatureHighTime":1533405600,"temperatureLow":78.5,"temperatureLowTime":1533459600,"apparentTemperatureHigh":94.43,"apparentTemperatureHighTime":1533405600,"apparentTemperatureLow":81.7,"apparentTemperatureLowTime":1533459600,"dewPoint":73.95,"humidity":0.75,"pressure":1020.21,"windSpeed":10.7,"windGust":15.79,"windGustTime":1533358800,"windBearing":104,"cloudCover":0.26,"uvIndex":10,"uvIndexTime":1533402000,"visibility":10,"ozone":294.08,"temperatureMin":79.42,"temperatureMinTime":1533373200,"temperatureMax":86.65,"temperatureMaxTime":1533405600,"apparentTemperatureMin":83.23,"apparentTemperatureMinTime":1533373200,"apparentTemperatureMax":94.43,"apparentTemperatureMaxTime":1533405600},{"time":1533441600,"summary":"Humid throughout the day and partly cloudy until afternoon.","icon":"partly-cloudy-day","sunriseTime":1533466101,"sunsetTime":1533514252,"moonPhase":0.79,"precipIntensity":0.0015,"precipIntensityMax":0.0042,"precipIntensityMaxTime":1533481200,"precipProbability":0.16,"precipType":"rain","temperatureHigh":86.28,"temperatureHighTime":1533492000,"temperatureLow":78.91,"temperatureLowTime":1533546000,"apparentTemperatureHigh":94.87,"apparentTemperatureHighTime":1533492000,"apparentTemperatureLow":82.32,"apparentTemperatureLowTime":1533546000,"dewPoint":74.76,"humidity":0.78,"pressure":1020.5,"windSpeed":9.18,"windGust":12.69,"windGustTime":1533492000,"windBearing":95,"cloudCover":0.29,"uvIndex":11,"uvIndexTime":1533492000,"visibility":10,"ozone":296.69,"temperatureMin":78.5,"temperatureMinTime":1533459600,"temperatureMax":86.28,"temperatureMaxTime":1533492000,"apparentTemperatureMin":81.7,"apparentTemperatureMinTime":1533459600,"apparentTemperatureMax":94.87,"apparentTemperatureMaxTime":1533492000},{"time":1533528000,"summary":"Humid throughout the day and partly cloudy starting in the evening.","icon":"partly-cloudy-night","sunriseTime":1533552534,"sunsetTime":1533600607,"moonPhase":0.82,"precipIntensity":0.0042,"precipIntensityMax":0.0233,"precipIntensityMaxTime":1533578400,"precipProbability":0.18,"precipType":"rain","temperatureHigh":85.35,"temperatureHighTime":1533582000,"temperatureLow":77.95,"temperatureLowTime":1533632400,"apparentTemperatureHigh":92.54,"apparentTemperatureHighTime":1533582000,"apparentTemperatureLow":79.34,"apparentTemperatureLowTime":1533632400,"dewPoint":73.62,"humidity":0.76,"pressure":1019.48,"windSpeed":8.22,"windGust":13.54,"windGustTime":1533600000,"windBearing":84,"cloudCover":0.32,"uvIndex":10,"uvIndexTime":1533574800,"visibility":10,"ozone":296.79,"temperatureMin":78.91,"temperatureMinTime":1533546000,"temperatureMax":85.35,"temperatureMaxTime":1533582000,"apparentTemperatureMin":82.32,"apparentTemperatureMinTime":1533546000,"apparentTemperatureMax":92.54,"apparentTemperatureMaxTime":1533582000},{"time":1533614400,"summary":"Humid and mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1533638968,"sunsetTime":1533686961,"moonPhase":0.86,"precipIntensity":0.0046,"precipIntensityMax":0.0279,"precipIntensityMaxTime":1533643200,"precipProbability":0.16,"precipType":"rain","temperatureHigh":86.16,"temperatureHighTime":1533679200,"temperatureLow":76.91,"temperatureLowTime":1533718800,"apparentTemperatureHigh":92.98,"apparentTemperatureHighTime":1533675600,"apparentTemperatureLow":78.37,"apparentTemperatureLowTime":1533718800,"dewPoint":72.42,"humidity":0.74,"pressure":1018.03,"windSpeed":5.3,"windGust":15.17,"windGustTime":1533697200,"windBearing":105,"cloudCover":0.85,"uvIndex":7,"uvIndexTime":1533661200,"visibility":10,"ozone":297.66,"temperatureMin":77.95,"temperatureMinTime":1533632400,"temperatureMax":86.16,"temperatureMaxTime":1533679200,"apparentTemperatureMin":79.34,"apparentTemperatureMinTime":1533632400,"apparentTemperatureMax":92.98,"apparentTemperatureMaxTime":1533675600},{"time":1533700800,"summary":"Humid throughout the day and partly cloudy overnight.","icon":"partly-cloudy-night","sunriseTime":1533725401,"sunsetTime":1533773314,"moonPhase":0.9,"precipIntensity":0.0073,"precipIntensityMax":0.0376,"precipIntensityMaxTime":1533751200,"precipProbability":0.43,"precipType":"rain","temperatureHigh":88.34,"temperatureHighTime":1533751200,"temperatureLow":76.79,"temperatureLowTime":1533808800,"apparentTemperatureHigh":95.95,"apparentTemperatureHighTime":1533751200,"apparentTemperatureLow":78.36,"apparentTemperatureLowTime":1533808800,"dewPoint":73.18,"humidity":0.74,"pressure":1016.51,"windSpeed":7.46,"windGust":18.47,"windGustTime":1533776400,"windBearing":181,"cloudCover":0.18,"uvIndex":11,"uvIndexTime":1533747600,"visibility":10,"ozone":298.04,"temperatureMin":76.91,"temperatureMinTime":1533718800,"temperatureMax":88.34,"temperatureMaxTime":1533751200,"apparentTemperatureMin":78.37,"apparentTemperatureMinTime":1533718800,"apparentTemperatureMax":95.95,"apparentTemperatureMaxTime":1533751200},{"time":1533787200,"summary":"Humid and mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1533811834,"sunsetTime":1533859665,"moonPhase":0.94,"precipIntensity":0.0043,"precipIntensityMax":0.0224,"precipIntensityMaxTime":1533848400,"precipProbability":0.49,"precipType":"rain","temperatureHigh":88.47,"temperatureHighTime":1533837600,"temperatureLow":76.75,"temperatureLowTime":1533891600,"apparentTemperatureHigh":98.02,"apparentTemperatureHighTime":1533837600,"apparentTemperatureLow":78.17,"apparentTemperatureLowTime":1533891600,"dewPoint":74.29,"humidity":0.78,"pressure":1016.67,"windSpeed":5.94,"windGust":17.66,"windGustTime":1533866400,"windBearing":206,"cloudCover":0.67,"uvIndex":8,"uvIndexTime":1533834000,"visibility":10,"ozone":289.69,"temperatureMin":76.79,"temperatureMinTime":1533808800,"temperatureMax":88.47,"temperatureMaxTime":1533837600,"apparentTemperatureMin":78.36,"apparentTemperatureMinTime":1533808800,"apparentTemperatureMax":98.02,"apparentTemperatureMaxTime":1533837600},{"time":1533873600,"summary":"Humid and partly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1533898267,"sunsetTime":1533946016,"moonPhase":0.97,"precipIntensity":0.0073,"precipIntensityMax":0.0611,"precipIntensityMaxTime":1533934800,"precipProbability":0.45,"precipType":"rain","temperatureHigh":88.61,"temperatureHighTime":1533924000,"temperatureLow":77.39,"temperatureLowTime":1533978000,"apparentTemperatureHigh":96.81,"apparentTemperatureHighTime":1533924000,"apparentTemperatureLow":78.91,"apparentTemperatureLowTime":1533978000,"dewPoint":73.64,"humidity":0.76,"pressure":1017.44,"windSpeed":4.94,"windGust":18.55,"windGustTime":1533949200,"windBearing":217,"cloudCover":0.58,"uvIndex":9,"uvIndexTime":1533920400,"visibility":10,"ozone":290.12,"temperatureMin":76.75,"temperatureMinTime":1533891600,"temperatureMax":88.61,"temperatureMaxTime":1533924000,"apparentTemperatureMin":78.17,"apparentTemperatureMinTime":1533891600,"apparentTemperatureMax":96.81,"apparentTemperatureMaxTime":1533924000}]};
        // this.setState(() => {
        //     return {
        //         forecast: jsonForecast,
        //         message: ''
        //     } ;
        // });
        // return;

        this.setState(() => {
            return {
                forecast: null,
                message: 'Fetching Forecast...Please Wait'
            };
        });
        const darkskyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKeyDarksky}/${this.props.location.latitude},${this.props.location.longitude}`;
        console.log('Call');
        axios.get(darkskyURL)
        .then((response) => {
            console.log('Call');
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