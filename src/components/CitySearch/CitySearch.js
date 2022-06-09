import React, { useCallback } from "react";

import PropTypes from "prop-types";

import debounce from "../../functions/debounce";
import shortenNames from "../../functions/shortenNames";

import "./city-search.scss";

function CitySearch({
  searchInputValue,
  setSearchInputValue,
  getCities,
  currentCity,
  setMainCity,
  setCurrentCity,
}) {
  // useCallback used to ensure the debounced function references the same function across renders
  // https://www.freecodecamp.org/news/debounce-and-throttle-in-react-with-hooks/
  // https://dmitripavlutin.com/react-throttle-debounce/
  // also:
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const debouncedGetCities = useCallback(debounce(getCities), []);

  const handleInputChange = (e) => {
    e.preventDefault();
    // 1. Update controlled input value via state update
    setSearchInputValue(e.target.value);

    // 2. Clear currentCity, to show dropdown list again (and remove country tag)
    setCurrentCity(null);

    // 2. Fetch cities for dropdown list
    debouncedGetCities(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (searchCityId) {
  //     setconfirmCityId(searchCityId);
  //     // also we need something here to disappear the dropdown (so wiping the dropdownCities)
  //     return;
  //   }

  //   // should be only fetchCities so that it doesn't update the city list, just gets the first value
  //   getCities();

  // }

  return (
    <form className="city-search">
      <label className="city-search__label" htmlFor="city-search">
        City name
      </label>
      <div className="city-search__search-bar">
        <input
          className={"city-search__input"}
          id="city-search"
          name="city-search"
          value={searchInputValue}
          onChange={handleInputChange}
        />
        {currentCity && (
          <span className={"city-search__country-tag"}>
            {searchInputValue && `(${shortenNames(currentCity.country)})`}
          </span>
        )}
      </div>

      <button
        className={"city-search__button"}
        onClick={(e) => {
          e.preventDefault();
          setMainCity(currentCity);
          setSearchInputValue("");
        }}
      >
        Display
      </button>
    </form>
  );
}

CitySearch.propTypes = {
  searchInputValue: PropTypes.string,
  setSearchInputValue: PropTypes.func,
  currentCity: PropTypes.object,
  getCities: PropTypes.func,
  setMainCity: PropTypes.func,
  setCurrentCity: PropTypes.func,
};

export default CitySearch;
