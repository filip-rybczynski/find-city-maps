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
import setToNull from "../../functions/setToNull";
import navigateArray from "../../functions/navigateArray";

// styles
import "./city-selection.scss";

function CitySelection({ setMainCity, setApiCallsLeft }) {
  const [dropdownCities, setDropdownCities] = useState(null); // list (array) of cities that appear in the search input field's dropdown. Value is NULL when input is empty (so there is no search/fetching data). If there is an array, even empty, it means input is populated/search was ran.
  const [dropdownError, setDropdownError] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState(""); // value of search input (controlled input)
  const [currentCity, setCurrentCity] = useState(null); // current city selected in the input (data already fetched)
  const [hideDropdown, setHideDropdown] = useState(false); // Used to temporarily hide dropdown when user clicks outside of its bounds (or outside of the input).
  const [submitError, setSubmitError] = useState(null); // Error for submit attempts with no city selected
  const [activeDropdownItem, setActiveDropdownItem] = useState(null); //

  // clear any input errors after a city is successfully chosen from the dropdown
  useEffect(() => {
    setSubmitError(null);
  }, [currentCity]);

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
    setDropdownError(fetchedData.errorMessage); // always assign even if null, to reset back to null if there was an error message before
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
    // Also clear dropdown cities and any error messages
    setToNull(
      setCurrentCity,
      setDropdownCities,
      setDropdownError,
      setSubmitError,
      setActiveDropdownItem
    );

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
      setToNull(setCurrentCity, setDropdownCities, setSubmitError);

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

  const handleKeyDown = (e) => {
    const key = e.key || e.keyCode || e.which;

    // Hide dropdown when tabbing out of the input
    // onBlur not used since there are two common scenarios where loss of focus shouldn't hide dropdown
    //  1. When clicking on the dropdown itself
    //  2. When clicking on the Submit button
    if (key === "Tab" || key === 9) setHideDropdown(true);
    
    if (!dropdownCities) return; // Nothing to do if there's no city content in the dropdown

    // Handle dropdown item selection if there is an active item (instead of trying to submit with an empty input)
    if (key === "Enter" || key === 13) {
      if (activeDropdownItem !== null) {
        e.preventDefault(); // To avoid form submission through event bubbling
        selectCity(dropdownCities[activeDropdownItem]);
        return;
      }
    }

    if (!["ArrowUp", "ArrowDown", 38, 40].includes(key)) return;
    if (key === "ArrowUp" || key === 38) e.preventDefault(); // to avoid cursor going back to the beginning of the input

    const newActiveItem = navigateArray(
      key,
      dropdownCities,
      activeDropdownItem
    );

    setActiveDropdownItem(newActiveItem);
  };

  const selectCity = (city) => {
    setCurrentCity(city);
    setSearchInputValue(city.name);
    setActiveDropdownItem(null);

    inputFocusRef.current.focus(); // To retain focus on the input
  };

  const generateDropdownComponent = !currentCity && searchInputValue; // Dropdown should appear if there is no city selected yet (in input), but the user is typing (searchInputValue is not empty)

  return (
    <div className={"city-selection"}>
      <header className="city-selection__header">Select city</header>
      {/* City search */}
      <form className="city-search" onSubmit={handleSubmit}>
        <div className="city-search__search-bar">
          <span className="city-search__label-container">
            <label className="city-search__main-label" htmlFor="city-search">
              Find a city name
            </label>
            {submitError && (
              <label className="city-search__error-label" htmlFor="city-search">
                {submitError}
              </label>
            )}
          </span>
          <span className="city-search__input-container">
            <input
              className={"city-search__input"}
              type="search"
              id="city-search"
              name="city-search"
              value={searchInputValue}
              placeholder="Start typing to search..."
              ref={inputFocusRef}
              onChange={handleInputChange}
              onFocus={() => {
                setHideDropdown(false);
              }}
              onKeyDown={handleKeyDown}
            />
            {
              // country tag to clarify which country the city's from
              currentCity && (
                <span className={"city-search__country-tag"}>
                  {`(${shortenNames(currentCity.country)})`}
                </span>
              )
            }
            {/* Dropdown */}
            {generateDropdownComponent && (
              <CitySearchDropdown
                selectCity={selectCity}
                dropdownContent={dropdownCities || dropdownError}
                isHidden={hideDropdown}
                setIfHidden={setHideDropdown}
                activeDropdownItem={activeDropdownItem}
              />
            )}
          </span>
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
