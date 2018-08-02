import React from 'react';

const Location = (props) => {
  const handleSearchLocation = (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value.trim();
    const encodedLocation = encodeURIComponent(location);
    props.handleRequest(encodedLocation);
    e.target.elements.location.value = '';
  }

  return (
    <div className="block">
      <form className="location" onSubmit={handleSearchLocation}>
        <span className="location__row">
            <input 
              className="location__input" 
              type="text" name="location" 
              autoComplete="off" 
              placeholder="Enter a Zipcode, a City or an Address"
              onFocus={props.onInputChange} 
            />
            <button className="location__button">{props.buttonText} Location</button>
        </span>
      </form>
      <div className="error__block">
        {props.error && <h3>Error: {props.error}</h3>}
      </div>
    </div>
  );
};

export default Location;
