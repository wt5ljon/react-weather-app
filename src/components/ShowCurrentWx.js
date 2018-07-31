import React from 'react';
import moment from 'moment';

const ShowCurrentWx = (props) => {
    const getCurrentKeys = () => {
        return props.current ? Object.keys(props.current) : [];
    }
    console.log(props.current);
    return (
        <div>
            <h3>Current Conditions for {props.location}</h3>
            {props.current && <h3>Time: {moment.unix(props.current.time).format('MMM DD YYYY, hh:mm:ss a')}</h3>}
            {getCurrentKeys().map((item) => <p key={item}>{item}: {props.current[item]}</p>)}
        </div>
    );
};

export default ShowCurrentWx;