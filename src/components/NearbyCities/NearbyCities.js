// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// components
import CityInfo from "../CityInfo/CityInfo";

// helper functions
import fetchGeoDBdata from "../../functions/fetchGeoDBdata";

// styles
import "./nearby-cities.scss";
import ButtonsFromCityArray from "../ButtonsFromCityArray/ButtonsFromCityArray";

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

  // Update nearby city list
  useEffect(() => {
    getNearbyCities(mainCity.id);

    return function () {
      setNearbyCitiesArr(null);
    };
  }, [mainCity]);

  return (
    // TransitionGroup allows me to manage child CSStransitions as a group and to keep both "entering" and "exiting" elements under my control using the "key" attribute
    <TransitionGroup component="section" className={`${cssClass} nearby-cities`}>

      {/* Found nearby cities */}

      <ButtonsFromCityArray
        cityArray={nearbyCitiesArr}
        mainCity={mainCity}
        handleFunction={handleClick}
        setNearbyCity={setNearbyCity}
        headerText={"Nearby cities"}
        className={"nearby-cities__buttons"}
      />

      {/* Information for selected nearby city (can be empty if none selected) */}

      {nearbyCity && (
        <CSSTransition
        classNames="nearby-city"
        key={nearbyCity.id} // key is crucial to keep both entering and exiting div under React's control (and on screen until timeout finishes)
        timeout={{ enter: 300, exit: 300 }}
      >
        <div
          className={`nearby-cities__info details`}
        >
          <CityInfo
            city={nearbyCity}
            dontShowCountry={nearbyCity.countryCode === mainCity.countryCode}
          />
          <button
            className="details__change-button"
            onClick={() => {
              setMainCity(nearbyCity);
              setNearbyCity(null);
            }}
          >
            Set as main city
          </button>
          
        </div>
        </CSSTransition>
      )}

    </TransitionGroup>
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
