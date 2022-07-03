import React, { useState } from "react";
import PropTypes from "prop-types";

import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useEffect } from "react";

function ButtonsFromCityArray({
  cityArray,
  mainCity,
  headerText,
  className: cssClass,
  setNearbyCity,
}) {
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    setActiveButton(null);
  }, [mainCity]);

  const handleClick = (e, city) => {
    e.preventDefault();

    if (activeButton !== city.id) {
      setActiveButton(city.id);
      setNearbyCity(city);
    } else {
      setActiveButton(null);
      setNearbyCity(null);
    }
  };

  return (
    <div className={`nearby-cities__buttons ${cssClass}`}>
      <h3 className="nearby-cities__header">{headerText}</h3>
      {!cityArray ? (
        <LoadingAnimation isVertical />
      ) : (
        cityArray.map((city) => (
          <button
            key={city.id}
            onClick={(e) => handleClick(e, city)}
            className={`nearby-cities__button ${
              city.id === activeButton ? "active" : ""
            }`}
          >
            {/* Button text content */}
            {city.name}
            {city.countryCode !== mainCity.countryCode
              ? ` (${city.countryCode})`
              : ""}
          </button>
        ))
      )}
    </div>
  );
}

ButtonsFromCityArray.propTypes = {
  array: PropTypes.array,
};

export default ButtonsFromCityArray;
