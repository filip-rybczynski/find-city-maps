import React, { useState } from "react";
import CitySearch from "./../CitySearch/CitySearch";
import CitySearchDropdown from "../CitySearchDropdown/CitySearchDropdown";
import APICallCounter from "../APICallCounter/APICallCounter";
import PropTypes from "prop-types";

import capitalize from "./../../functions/capitalize";
import debounce from "../../functions/debounce";

function CitySelection({ setCityToDisplay }) {
  // I want to have an initially chosen city here
  // As well as an array of fetched cities

  const getTodaysAPICalls = () => {
    // constant used to track the API call limit (which resets each day)
    const today = new Date().toLocaleDateString();

    let todaysAPICalls = localStorage.getItem(`apiCallsLeftFor${today}`);

    if (todaysAPICalls) {
      return todaysAPICalls;
    } else {
      // removing previous API call number records for tidiness
      localStorage.clear();
      return 1000;
    }
  };

  const [dropdownCities, setDropdownCities] = useState([]);
  const [apiCallsLeft, setApiCallsLeft] = useState(getTodaysAPICalls());
  const [searchValue, setSearchValue] = useState("");
  const [currentCity, setCurrentCity] = useState(null);
  // const [inputError, setInputError] = useState('');

  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  const getCities = (prefix) => {
    if (prefix === "") {
      setDropdownCities([]);
      return;
    }
    const searchPrefix = capitalize(prefix);

    // Params must be part of the URL due to limitations of the fetch API
    // https://github.com/github/fetch/issues/256
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`,
      fetchOptions
    )
      .then((response) => {
        const callsRemaining = response.headers.get(
          "x-ratelimit-requests-remaining"
        );
        setApiCallsLeft(callsRemaining);
        localStorage.setItem(
          `apiCallsLeftFor${new Date().toLocaleDateString()}`,
          callsRemaining
        );
        return response.json();
      })
      .then((response) => {
        if (response.data.length === 0) {
          return;
        }

        const cities = response.data.filter((city) => {
          return city.type === "CITY" && city.name.startsWith(searchPrefix);
        });
        setDropdownCities(cities);
      })
      .catch((err) => console.error(err));
  };

  // const getCities = () => {
  //   console.log('fetchCities');

  //   setApiCallsLeft(apiCallsLeft - 1);
  // };

  const confirmCity = () => {
    setCityToDisplay(currentCity);
  };

  return (
    <div className={"city-selection"}>
      <CitySearch
        className={"city-selection__search"}
        searchValue={searchValue}
        currentCity={currentCity}
        getCities={getCities}
        setSearchValue={setSearchValue}
        setCurrentCity={setCurrentCity}
        confirmCity={confirmCity}
        setCityToDisplay={setCityToDisplay}
        setDropdownCities={setDropdownCities}
      />
      {
        !currentCity &&
        (<CitySearchDropdown
          className={"city-selection__dropdown"}
          dropdownCities={dropdownCities}
          setSearchValue={setSearchValue}
          setCurrentCity={setCurrentCity}
        />)
      }
      
      <APICallCounter
        className={"city-selection__api-counter"}
        callsRemaining={apiCallsLeft}
      ></APICallCounter>
    </div>
  );

  // return (
  //   <>
  //     <form>
  //       <label htmlFor="city-name-search">Search city</label>
  //       <input
  //         list="city-names"
  //         id="city-name-search"
  //         name="city-name-search"
  //         value={props.searchedName}
  //         onChange={props.handleCitySearch}
  //       />
  //       <datalist id="city-names">
  //         {props.cities.map(city => (
  //           <option key={city.id} value={`${city.name}, ${city.country}`} />
  //           ))}
  //       </datalist>
  //       <button onClick={props.handleChoice}>Select</button>
  //     </form>
  //   </>
  // );
}

CitySelection.propTypes = {
  setCityToDisplay: PropTypes.func,
};

export default CitySelection;
