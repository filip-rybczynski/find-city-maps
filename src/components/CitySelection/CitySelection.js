// React
import React, { useState } from "react";

// components
import CitySearch from "./../CitySearch/CitySearch";
import CitySearchDropdown from "../CitySearchDropdown/CitySearchDropdown";
import PropTypes from "prop-types";

// helper functions
import capitalize from "./../../functions/capitalize";

// styles
import "./city-selection.scss";

function CitySelection({ setMainCity, setApiCallsLeft }) {
  const [dropdownCities, setDropdownCities] = useState(null); // list of cities that appear in the search input field's dropdown
  const [searchInputValue, setSearchInputValue] = useState(""); // value of search input (controlled input)
  const [currentCity, setCurrentCity] = useState(null); // current city selected in the input (data already fetched)
  // const [inputError, setInputError] = useState(''); // TODO

  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  const getCities = (prefix) => {
    if (prefix === "") {
      setDropdownCities(null);
      return;
    }
    const searchPrefix = capitalize(prefix);

    // Params must be part of the URL due to limitations of the fetch API
    // https://github.com/github/fetch/issues/256
    // I don't need to change parameters in this function, so no issues
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`,
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
        if (response.data.length === 0) {
          setDropdownCities(null);
          return;
        }

        const cities = response.data.filter((city) => {
          return city.type === "CITY" && city.name.startsWith(searchPrefix);
        });
        if (cities.length === 0) {
          setDropdownCities(null);
          return;
        }
        setDropdownCities(cities);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={"city-selection"}>
      <header className="city-selection__header">Select city</header>
      <CitySearch
        searchInputValue={searchInputValue}
        currentCity={currentCity}
        getCities={getCities}
        setSearchInputValue={setSearchInputValue}
        setCurrentCity={setCurrentCity}
        setMainCity={setMainCity}
      />
      {
        // only display dropdown when (1) there is no current selection and (2) there is a list of cities to display (fetching returns an array)
      !currentCity && dropdownCities &&
        <CitySearchDropdown
          className={"city-selection__dropdown"}
          dropdownCities={dropdownCities}
          setSearchInputValue={setSearchInputValue}
          setCurrentCity={setCurrentCity}
        />
      }
    </div>
  );
}

CitySelection.propTypes = {
  setMainCity: PropTypes.func,
  setApiCallsLeft: PropTypes.func,
};

export default CitySelection;
