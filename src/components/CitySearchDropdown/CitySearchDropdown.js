import React from "react";
import DropdownItem from "../DropdownItem/DropdownItem";

import PropTypes from 'prop-types';

import "./city-search-dropdown.scss";

function CitySearchDropdown({ dropdownCities, setCurrentCity, setSearchInputValue }) {

  const chooseFocusedOption = (e) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    console.log(keycode, e.which);
    if (keycode === 13 || keycode === 32) {
      document.activeElement.click();
      // Worth considering:
      // https://stackoverflow.com/questions/58886782/how-to-find-focused-react-component-like-document-activeelement
    }
  };

  return (
      <ul className={"dropdown"} onKeyPress={chooseFocusedOption}>
        {dropdownCities && dropdownCities.map((city) => (
          <DropdownItem
            key={city.id}
            city={city}
            setCurrentCity={setCurrentCity}
            setSearchInputValue={setSearchInputValue}

            className={'dropdown__item'}
          >
              {/* {`${city.name} (${city.country})`} */}
          </DropdownItem>
        ))}
      </ul>
  );
}

CitySearchDropdown.propTypes = {
  dropdownCities: PropTypes.array,
  setSearchInputValue: PropTypes.func,
  setCurrentCity:PropTypes.func,
}

export default CitySearchDropdown;
