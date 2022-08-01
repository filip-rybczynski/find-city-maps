// React
import React from "react";
import PropTypes from "prop-types";

// components
import DropdownItem from "../DropdownItem/DropdownItem";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

// styles
import "./city-search-dropdown.scss";

function CitySearchDropdown({
  dropdownCities,
  setCurrentCity,
  setSearchInputValue,
  inputError,
}) {
  const chooseFocusedOption = (e) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === 13 || keycode === 32) {
      document.activeElement.click();
      // Worth considering:
      // https://stackoverflow.com/questions/58886782/how-to-find-focused-react-component-like-document-activeelement
    }
  };

  if (dropdownCities === null)
    return inputError ? (
      <span className={"dropdown dropdown__error"}>{inputError}</span>
    ) : (
      <span className={"dropdown"}>
        <LoadingAnimation />
      </span>
    ); // return loading component if dropdownCities is not populated at all (meaning no search was ran)

  return dropdownCities.length === 0 ? (
    <span className={"dropdown dropdown__no-results"}>Sorry, no results!</span>
  ) : (
    <ul className={"dropdown"} onKeyPress={chooseFocusedOption}>
      {dropdownCities &&
        dropdownCities.map((city) => (
          <DropdownItem
            key={city.id}
            city={city}
            setCurrentCity={setCurrentCity}
            setSearchInputValue={setSearchInputValue}
          />
        ))}
    </ul>
  );
}

CitySearchDropdown.propTypes = {
  dropdownCities: PropTypes.array,
  setSearchInputValue: PropTypes.func,
  setCurrentCity: PropTypes.func,
  inputError: PropTypes.string,
};

export default CitySearchDropdown;
