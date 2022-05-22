import React from "react";
import DropdownItem from "../DropdownItem/DropdownItem";

import PropTypes from 'prop-types';

import "./city-search-dropdown.scss";

function CitySearchDropdown({ dropdownCities, setCurrentCity, setSearchValue }) {
  return (
      <ul className={"dropdown"}>
        {dropdownCities && dropdownCities.map((city) => (
          <DropdownItem
            key={city.id}
            city={city}
            setCurrentCity={setCurrentCity}
            setSearchValue={setSearchValue}

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
  setSearchValue: PropTypes.func,
  setCurrentCity:PropTypes.func,
}

export default CitySearchDropdown;
