// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import CityInfo from "../CityInfo/CityInfo";

// styles
import "./nearby-cities.scss";

function NearbyCities({
  nearbyCity,
  mainCity,
  setApiCallsLeft,
  setMainCity,
  setNearbyCity,
}) {
  const [nearbyCitiesArr, setNearbyCitiesArr] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  const getNearbyCities = (id) => {
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}/nearbyCities?limit=10&radius=100&minPopulation=100000&types=CITY&sort=-population`,
      fetchOptions
    )
      .then((response) => {
        const callsRemaining = response.headers.get(
          "x-ratelimit-requests-remaining"
        );

        setApiCallsLeft(callsRemaining);

        return response.json();
      })
      .then((response) => {
        const nearbyCities = response.data;

        setNearbyCitiesArr(nearbyCities.length > 0 ? nearbyCities : null);
      })
      .catch((err) => {
        console.log(err);
      });
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
    setTimeout(() => {
      getNearbyCities(mainCity.id);
    }, 500);

    return function () {
      setNearbyCitiesArr(null);
    };
  }, [mainCity]);

  return (
    <div className={"nearby-cities"}>
      {/* Found nearby cities */}
      <div className={"nearby-cities__buttons"}>
        {nearbyCitiesArr && nearbyCitiesArr.map((city) => (
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
      <div className="nearby-cities__info">
        {!nearbyCity ? (
          ""
        ) : (
          <>
            <h3>{nearbyCity.name}</h3>
            <CityInfo
              city={nearbyCity}
              dontShowCountry={nearbyCity.countryCode === mainCity.countryCode}
            />
            <button
              onClick={() => {
                setMainCity(nearbyCity);
                setNearbyCity(null);
              }}
            >
              Set as main city
            </button>
          </>
        )}
      </div>
    </div>
  );
}

NearbyCities.propTypes = {
  nearbyCity: PropTypes.object,
  mainCity: PropTypes.object,
  setApiCallsLeft: PropTypes.func,
  setMainCity: PropTypes.func,
  setNearbyCity: PropTypes.func,
};

export default NearbyCities;
