// React
import React, { useCallback } from "react";
import PropTypes from "prop-types";

// helper functions
import debounce from "../../functions/debounce";
import shortenNames from "../../functions/shortenNames";

// styles
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
    // 1. prevent default form/input behaviour
    e.preventDefault();

    // 2. Update controlled input value via state update
    setSearchInputValue(e.target.value);

    // 3. Since we are searching for cities again, clear currentCity. This will show dropdown list again and remove the country tag visible in the input field
    setCurrentCity(null);

    // 4. Fetch cities for dropdown list
    debouncedGetCities(e.target.value);
  };

  const handleSubmit = (e) => {
    // 1. prevent default form/input behaviour
    e.preventDefault();

    // 2. set main city for the app to display
    setMainCity(currentCity);

    // 3. clear out the search input field
    setSearchInputValue("");
  };

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
        {
          // country tag to clarify which country the city's from
          currentCity && (
            <span className={"city-search__country-tag"}>
              {searchInputValue && `(${shortenNames(currentCity.country)})`}
            </span>
          )
        }
      </div>

      <button className={"city-search__button"} onClick={handleSubmit}>
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
