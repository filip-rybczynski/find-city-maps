import React from "react";
import DropdownItem from "../DropdownItem/DropdownItem";

import PropTypes from 'prop-types';

function CitySearchDropdown({ dropdownCities, setCurrentCity, setSearchValue }) {
  return (
    <div className={"city-search__dropdown"}>
      <ul>
        {dropdownCities && dropdownCities.map((city) => (
          <DropdownItem
            key={city.id}
            city={city}
            setCurrentCity={setCurrentCity}
            setSearchValue={setSearchValue}
          >
              {/* {`${city.name} (${city.country})`} */}
          </DropdownItem>
        ))}
      </ul>
    </div>
  );
}

CitySearchDropdown.propTypes = {
  dropdownCities: PropTypes.array,
  setSearchValue: PropTypes.func,
  setCurrentCity:PropTypes.func,
}

export default CitySearchDropdown;
