// React
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

// components
import CitySearchDropdown from "../CitySearchDropdown/CitySearchDropdown";

// helper functions
import debounce from "../../functions/debounce";
import shortenNames from "../../functions/shortenNames";
import capitalize from "./../../functions/capitalize";
import fetchGeoDBdata from "../../functions/fetchGeoDBdata";

// styles
import "./city-selection.scss";

function CitySelection({ setMainCity, setApiCallsLeft }) {
  const [dropdownCities, setDropdownCities] = useState(null); // list (array) of cities that appear in the search input field's dropdown. Value is NULL when input is empty (so there is no search/fetching data). If there is an array, even empty, it means input is populated/search was ran.
  const [searchInputValue, setSearchInputValue] = useState(""); // value of search input (controlled input)
  const [currentCity, setCurrentCity] = useState(null); // current city selected in the input (data already fetched)
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  // const [inputError, setInputError] = useState(''); // TODO

  // Fetch data and update the state
  const getData = async (input) => {
    // 1. If input value is empty, set dropdown content to empty and return without fetching any data
    if (input === "") {
      setDropdownCities(null);
      return;
    }
    const searchPrefix = capitalize(input);

    // 2. Generate URL
    // Params must be part of the URL due to limitations of the fetch API
    // https://github.com/github/fetch/issues/256
    // I don't need to change parameters in this function, so no issues
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`;

    // 3. Call fetching function
    const fetchedData = await fetchGeoDBdata(url, searchPrefix); // second parameter is for additional filtering

    // 4. Update state
    setDropdownCities(fetchedData.cities);
    setApiCallsLeft(fetchedData.apiCallsLeft);
  };

  // useCallback used to ensure the debounced function references the same function across renders
  // https://www.freecodecamp.org/news/debounce-and-throttle-in-react-with-hooks/
  // https://dmitripavlutin.com/react-throttle-debounce/
  // also:
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const debouncedGetData = useCallback(debounce(getData), []);

  // Handling the controlled input update and triggering the debounced data fetch (to execute later)
  const handleInputChange = (e) => {
    // 1. prevent default form/input behaviour
    e.preventDefault();

    // 2. Update controlled input value via state update
    setSearchInputValue(e.target.value);

    // 3. Since we are searching for cities again, clear currentCity. This will show dropdown list again and remove the country tag visible in the input field
    setCurrentCity(null);

    // 4. Fetch cities for dropdown list
    debouncedGetData(e.target.value);
  };

  const handleSubmit = (e) => {
    // 1. prevent default form/input behaviour
    e.preventDefault();

    // 2. set main city for the app to display
    setMainCity(currentCity);

    // 3. clear out the search input field, currentCity and dropdownlist
    setSearchInputValue("");
    setCurrentCity(null);
    setDropdownCities(null);
  };

  const generateDropdownComponent = !currentCity && searchInputValue; // Dropdown should show if there is no current selection, but there is something in the search input

  return (
    <div className={"city-selection"}>
      <header className="city-selection__header">Select city</header>

      {/* City search */}
      <form className="city-search">
        <label className="city-search__label" htmlFor="city-search">
          City name
        </label>
        <div className="city-search__search-bar">
          <div className="city-search__input-container">
            <input
              className={"city-search__input"}
              id="city-search"
              name="city-search"
              value={searchInputValue}
              onChange={handleInputChange}
              disabled={isInputDisabled}
            />
            {
              // country tag to clarify which country the city's from
              currentCity && (
                <span className={"city-search__country-tag"}>
                  {`(${shortenNames(currentCity.country)})`}
                </span>
              )
            }
          </div>
          {/* Dropdown */}
          {
            // only display dropdown when (1) there is no current selection and (2) there is an array of cities to display
            generateDropdownComponent && (
              <CitySearchDropdown
                dropdownCities={dropdownCities}
                setSearchInputValue={setSearchInputValue}
                setCurrentCity={setCurrentCity}
              />
            )
          }
          {/* Display button */}
          <button className={"city-search__button"} onClick={handleSubmit}>
            Display
          </button>
        </div>
      </form>
    </div>
  );
}

CitySelection.propTypes = {
  setMainCity: PropTypes.func,
  setApiCallsLeft: PropTypes.func,
};

export default CitySelection;
