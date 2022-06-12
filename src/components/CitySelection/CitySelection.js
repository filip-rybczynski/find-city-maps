// React
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

// components
import CitySearchDropdown from "../CitySearchDropdown/CitySearchDropdown";

// helper functions
import debounce from "../../functions/debounce";
import shortenNames from "../../functions/shortenNames";
import capitalize from "./../../functions/capitalize";

// styles
import "./city-selection.scss";

function CitySelection({ setMainCity, setApiCallsLeft }) {
  const [dropdownCities, setDropdownCities] = useState(null); // list (array) of cities that appear in the search input field's dropdown. Empty is null since [] is not a falsey value and that will be useful in the render
  const [searchInputValue, setSearchInputValue] = useState(""); // value of search input (controlled input)
  const [currentCity, setCurrentCity] = useState(null); // current city selected in the input (data already fetched)
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  // const [inputError, setInputError] = useState(''); // TODO

  const FETCH_OPTIONS = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  const getCities = (input) => {
    if (input === "") {
      setDropdownCities(null);
      return;
    }
    const searchPrefix = capitalize(input);

    // Params must be part of the URL due to limitations of the fetch API
    // https://github.com/github/fetch/issues/256
    // I don't need to change parameters in this function, so no issues
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`,
      FETCH_OPTIONS
    )
      .then((response) => {
        const callsRemaining = response.headers.get(
          "x-ratelimit-requests-remaining"
        );
        setApiCallsLeft(callsRemaining); // TODO? if I had a different way of updating this I could extract the entire function into a different file

        return response.json();
      })
      .then((response) => {
        const cities = response.data.filter((city) => {
          return city.type === "CITY" && city.name.startsWith(searchPrefix);
        });

        setDropdownCities(cities.length > 0 ? cities : null);
      })
      .catch((err) => console.error(err));
  };

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

    // 3. clear out the search input field, currentCity and dropdownlist
    setSearchInputValue("");
    setCurrentCity(null);
    setDropdownCities(null);

    // 4. disable input to block fetching search results and avoid conflict with neighbouring city fetching - due to free API access limitations, only 1 request per second is permitted
    setIsInputDisabled(true);

    // 5. enable input after safe time has passed (0.5s would be sufficient, but it's very fast and gives an almost 'flicker' effect, 1s looks better)
    setTimeout(() => {
      setIsInputDisabled(false);
    }, 1000);
  };

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
            // only display dropdown when (1) there is no current selection and (2) there is a list of cities to display (fetching returns an array)
            !currentCity && dropdownCities && (
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
