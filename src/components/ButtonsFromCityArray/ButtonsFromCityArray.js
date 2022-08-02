// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

// styles
import "./buttons-from-city-array.scss";

function ButtonsFromCityArray({
  cityArray,
  mainCity,
  setNearbyCity,
  inputError,
}) {
  const [activeButton, setActiveButton] = useState(null);

  // Reset active button after main city change
  useEffect(() => {
    setActiveButton(null);
  }, [mainCity]);

  const handleClick = (e, city) => {
    e.preventDefault();

    // toggle active button display
    if (activeButton !== city.id) {
      setActiveButton(city.id);
      setNearbyCity(city);
    } else {
      setActiveButton(null);
      setNearbyCity(null);
    }
  };

  if (inputError) {
    // 1. Check if there's an error
    // if yes, display error
    return <strong className="error">{inputError}</strong>;
  } else if (!cityArray) {
    // 2. Check if there's an array of cities fetched
    // if not (cityArray === null), display loading animation
    return <LoadingAnimation isVertical />;
  } else if (cityArray.length === 0) {
    // 3. Check if array is empty
    // if yes, display message
    return <span className="no-nearby-cities">No cities found nearby!</span>;
  }

  // 4. If none of the above are met, generate and display a list of buttons
  return cityArray.map((city) => (
    <button
      key={city.id}
      onClick={(e) => handleClick(e, city)}
      className={`nearby-cities__button ${
        city.id === activeButton && "active"
      }`}
    >
      {/* Button text content */}
      {city.name}
      {city.countryCode !== mainCity.countryCode && // additional data point if button refers to city in different country than the main displayed city
        " " + city.countryCode}
    </button>
  ));
}

ButtonsFromCityArray.propTypes = {
  CityArray: PropTypes.array,
  mainCity: PropTypes.object,
  setNearbyCity: PropTypes.func,
  inputError: PropTypes.string,
};

export default ButtonsFromCityArray;
