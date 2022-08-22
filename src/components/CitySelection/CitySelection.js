// React
import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const [inputError, setInputError] = useState(null);
  const [hideDropdown, setHideDropdown] = useState(false); // Used to temporarily hide dropdown when user clicks outside of its bounds (or outside of the input).
  // Handling primarily in the CitySearchDropdown component
  const [submitError, setSubmitError] = useState(null); // Error for submit attempts with no city selected

  // clear any input errors after a city is successfully chosen from the dropdown
  useEffect(() => {
    setSubmitError(null);
  }, [currentCity])

  const inputFocusRef = useRef(null);

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

    setApiCallsLeft(fetchedData.apiCallsLeft);
    setInputError(fetchedData.errorMessage); // always assign even if null, to reset back to null if there was an error message before
    setDropdownCities(fetchedData.cities); // If there is an error, cities === null;
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

    // 3. Since we are searching for cities again, clear currentCity and dropdown city list, as well as any potential error. This will show dropdown list again and remove the country tag visible in the input field
    setCurrentCity(null);
    // Also clear dropdown cities and any error messages
    setDropdownCities(null);
    setInputError(null);
    setSubmitError(null);

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

  const checkIfCanSubmit = (e) => {
    e.preventDefault();

    if (currentCity) {
      setSubmitError(null);
      handleSubmit(e);
      return;
    }

    inputFocusRef.current.focus();

    if (searchInputValue === "") {
      setSubmitError("Please search for a city first");
    } else {
      setSubmitError("Please select a city from the dropdown");
    }
  };

  const showDropdownIfHidden = (e) => {
    if (hideDropdown) setHideDropdown(!hideDropdown);
  };

  const generateDropdownComponent = !currentCity && searchInputValue; // Dropdown should appear if there is no city selected yet (in input), but the user is typing (searchInputValue is not empty)

  return (
    <div className={"city-selection"}>
      <header className="city-selection__header">Select city</header>

      {/* City search */}
      <form className="city-search" onSubmit={checkIfCanSubmit}>
      <div className="city-search__search-bar">

        <span className="city-search__label-container">
          <label className="city-search__main-label" htmlFor="input">
            Find a city name
          </label>
          {submitError && (
            <label
              className="city-search__error-label"
              htmlFor="input"
            >
              {submitError}
            </label>
          )}
        </span>
          <span className="city-search__input-container">
            <input
              className={"city-search__input"}
              id="input"
              name="city-search"
              value={searchInputValue}
              placeholder="Start typing to search..."
              ref={inputFocusRef}
              onChange={handleInputChange}
              onClick={showDropdownIfHidden}
              onFocus={() => setSubmitError(null)}
            />
            {
              // country tag to clarify which country the city's from
              currentCity && (
                <span className={"city-search__country-tag"}>
                  {`(${shortenNames(currentCity.country)})`}
                </span>
              )
            }
          </span>
          {/* Dropdown */}
          {generateDropdownComponent && (
            <CitySearchDropdown
              dropdownCities={dropdownCities}
              setSearchInputValue={setSearchInputValue}
              setCurrentCity={setCurrentCity}
              inputError={inputError}
              isHidden={hideDropdown}
              setIfHidden={setHideDropdown}
            />
          )}
          {/* Display button */}
          <button type="submit" className={"city-search__button"}>
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
