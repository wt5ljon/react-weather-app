import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import ForecastWx from './ForecastWx';
import Footer from './Footer';

export default class ForecastPage extends React.Component {
    state = {
        location: null
    }
    
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

    render() {
        return (
            <div>
                <Header title="Weather App" subtitle="7-Day Forecast" />
                <div className="container">
                    <ForecastWx location={this.state.location} />
                </div>
            </div>
        );    
    }
}
