// React
import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// components
import CitySearch from "../CitySearch/CitySearch";

// helper functions
import debounce from "../../functions/debounce";
import capitalize from "./../../functions/capitalize";
import fetchGeoDBdata from "../../functions/fetchGeoDBdata";
import setToNull from "../../functions/setToNull";

// styles
import "./city-selection.scss";

function CitySelection({ setMainCity, setApiCallsLeft }) {
  const [dropdownContent, setDropdownContent] = useState(null); // This can be either:
  // - list (array) of cities that appear in the search input field's dropdown. Value is NULL when input is empty (so there is no search/fetching data). If there is an array, even empty, it means input is populated/search was ran.
  // - error message (string)
  const [searchInputValue, setSearchInputValue] = useState(""); // value of search input (controlled input). Raised to this component in order to be cleared on submission
  const [currentCity, setCurrentCity] = useState(null); // current city selected in the input (data already fetched)
  const [submitError, setSubmitError] = useState(null); // Error for submit attempts with no city selected

  const inputFocusRef = useRef(null);

  // clear any input errors after a city is successfully chosen from the dropdown
  useEffect(() => {
    setSubmitError(null);
  }, [currentCity]);

  // Fetch data and update the state
  const getData = async (input) => {
    // 1. If input value is empty, return without fetching any data
    if (input === "") return;

    // 2. make sure input is capitalized
    const searchPrefix = capitalize(input);

    // 3. Generate URL
    // Params must be part of the URL due to limitations of the fetch API
    // https://github.com/github/fetch/issues/256
    // I don't need to change parameters in this function, so no issues
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`;

    // 4. Call fetching function
    const fetchedData = await fetchGeoDBdata(url, searchPrefix); // second parameter is for additional filtering

    // 5. Update state
    setApiCallsLeft(fetchedData.apiCallsLeft); // update API calls left count
    setDropdownContent(fetchedData.errorMessage || fetchedData.cities); // one of these will always be null
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
    // Also clear dropdown content
    setToNull(setCurrentCity, setDropdownContent, setSubmitError);

    // 4. Fetch cities for dropdown list
    debouncedGetData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit if city selected in the input field
    if (currentCity) {
      // 1. set main city for the app to display
      setMainCity(currentCity);

      // 2. clear out the search input field, set currentCity, dropdownlist and submitError to null
      setSearchInputValue("");
      setToNull(setCurrentCity, setDropdownContent);
      return;
    }

    // If no city selected in input, display error and focus back on input
    if (searchInputValue === "") {
      setSubmitError("Please search for a city first");
    } else {
      setSubmitError("Please select a city from the dropdown");
    }

    inputFocusRef.current.focus();
  };

  const selectCity = (city) => {
    setCurrentCity(city);
    setSearchInputValue(city.name);

    inputFocusRef.current.focus(); // To retain focus on the input
  };

  return (
    <div className={"city-selection"}>
      <header className="city-selection__header">Select city</header>
      {/* City search */}
      <form className="city-selection__form" onSubmit={handleSubmit}>
        <div className="city-selection__search-bar">
          <CitySearch
            searchInputValue={searchInputValue}
            dropdownContent={dropdownContent}
            handleInputChange={handleInputChange}
            selectCity={selectCity}
            currentCity={currentCity}
            submitError={submitError}
            ref={inputFocusRef}
          />
          {/* Display button */}
          <button type="submit" className={"city-selection__button"}>
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
