import React from 'react';
import moment from 'moment';
import getIcon from '../utility/getIcon';

const ForecastItem = (props) => {
    const now = moment.unix(props.data.time);
    return (
        <div className="block">
            <span className="forecast__text">{now.format('dddd, MMM DD, YYYY')}</span>
            <span className="forecast__text">{props.data.summary}</span>
            <div className="forecast__row">
                <i className={`icon wi wi-${getIcon(props.data.icon)}`}></i> 
                <i className={`icon wi wi-${getIcon(props.data.icon)}`}></i> 
            </div>
            <div className="forecast__row">
                <span className="forecast__text">High: {Math.round(props.data.temperatureHigh)}{`\xB0F`}</span>
                <span className="forecast__text">Low: {Math.round(props.data.temperatureLow)}{`\xB0F`}</span>
            </div>
            <div className="forecast__row">
                <span className="forecast__text">Sunrise: {moment.unix(props.data.sunriseTime).format('hh:mm:ss a')}</span>
                <span className="forecast__text">Sunset: {moment.unix(props.data.sunsetTime).format('hh:mm:ss a')}</span>
            </div>
        </div>
    );
};

export default ForecastItem;