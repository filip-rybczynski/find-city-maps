// React
import React, { useState, useEffect } from "react";
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
  isHidden,
  setIfHidden,
}) {
  const chooseFocusedOption = (e) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === 13 || keycode === 32) {
      document.activeElement.click();
      // Worth considering:
      // https://stackoverflow.com/questions/58886782/how-to-find-focused-react-component-like-document-activeelement
    }
  };

  const handleClickOutside = (e) => {
    // If click is outside of the dropdown OR the input, dropdown should be hidden
    // Dropdown hiding handled using a special "hidden" class (display: none)
    // (Simpler than mounting/unmounting)
    const isOutside =
      !e.target.closest(`[id=dropdown]`) &&
      !e.target.closest(`[id=city-search]`) &&
      !e.target.closest(`[type=submit]`);

    setIfHidden(isOutside);
  };

  useEffect(() => {
    // One instance where using addEventListener in React is OK
    // https://linguinecode.com/post/react-onclick-event-vs-js-addeventlistener

    // If dropdown component renders AND is visible, listener should be added, so that clicking outside of its bounds (or the input) hides it
    if (!isHidden) document.addEventListener("click", handleClickOutside);

    return () => {
      // Remove listener before each rerender - it will be added if needed (as per above)
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isHidden]);

  if (dropdownCities === null)
    return (
      <span className={`dropdown ${isHidden && "hidden"}`}>
        <LoadingAnimation />
      </span>
    ); // return loading component if dropdownCities is not populated at all (meaning no search was ran)

  return dropdownCities.length === 0 ? (
    <span
      className={`dropdown dropdown__no-results ${isHidden && "hidden"}`}
      id="dropdown"
    >
      Sorry, no results!
    </span>
  ) : (
    <ul
      className={`dropdown ${isHidden && "hidden"}`}
      id="dropdown"
      onKeyPress={chooseFocusedOption}
    >
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
};

export default CitySearchDropdown;
