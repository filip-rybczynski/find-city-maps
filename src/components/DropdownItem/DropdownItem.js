import React from "react";

import PropTypes from 'prop-types';

function DropdownItem({ setCurrentCity, setSearchValue, city }) {
  const chooseOption = () => {
    setCurrentCity(city.id);

    setSearchValue(city.name);
  };

  return <li onClick={chooseOption}>{`${city.name} (${city.country})`}</li>;
}

DropdownItem.propTypes = {
  setCurrentCity: PropTypes.func,
  setSearchValue: PropTypes.func,
  city: PropTypes.object,
}

export default DropdownItem;
