// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// components
import CityInfo from "../CityInfo/CityInfo";

// helper functions
import fetchGeoDBdata from "../../functions/fetchGeoDBdata";

// styles
import "./nearby-cities.scss";

function NearbyCities({
  nearbyCity,
  mainCity,
  setApiCallsLeft,
  setMainCity,
  setNearbyCity,
  className: cssClass,
}) {
  const [nearbyCitiesArr, setNearbyCitiesArr] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const getNearbyCities = async (id) => {
    // 1. Generate URL
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}/nearbyCities?limit=10&radius=100&minPopulation=100000&types=CITY&sort=-population`;

    // 2. Call fetching function
    const fetchedData = await fetchGeoDBdata(url);

    // 3. Update state
    setNearbyCitiesArr(fetchedData.cities);
    setApiCallsLeft(fetchedData.apiCallsLeft);
  };

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

  // Delay implemented to stay within 1 request per sec limit of API
  useEffect(() => {
      getNearbyCities(mainCity.id);

    return function () {
      setNearbyCitiesArr(null);
    };
  }, [mainCity]);

  return (
    <section className={`${cssClass} nearby-cities`}>
      {/* Found nearby cities */}
      <div className="nearby-cities__buttons">
        <h3 className="nearby-cities__header">Nearby cities</h3>
        {nearbyCitiesArr &&
          nearbyCitiesArr.map((city) => (
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
          ))}
      </div>
      {/* Information for selected nearby city (can be empty if none selected) */}
      <div
        className={`nearby-cities__info details ${
          !nearbyCity ? "" : "visible"
        }`}
      >
        {!nearbyCity ? (
          ""
        ) : (
          <>
            <h3 className="details__header">{nearbyCity.name}</h3>
            <button
              className="details__change-button"
              onClick={() => {
                setMainCity(nearbyCity);
                setNearbyCity(null);
              }}
            >
              Set as main city
            </button>
            <CityInfo
              city={nearbyCity}
              dontShowCountry={nearbyCity.countryCode === mainCity.countryCode}
            />
          </>
        )}
      </div>
    </section>
  );
}

NearbyCities.propTypes = {
  nearbyCity: PropTypes.object,
  mainCity: PropTypes.object,
  setApiCallsLeft: PropTypes.func,
  setMainCity: PropTypes.func,
  setNearbyCity: PropTypes.func,
  className: PropTypes.string,
};

export default NearbyCities;
