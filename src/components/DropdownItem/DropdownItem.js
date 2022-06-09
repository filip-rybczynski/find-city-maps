import React from "react";

import PropTypes from "prop-types";

import "./dropdown-item.scss";

function DropdownItem({ setCurrentCity, setSearchInputValue, city }) {
  const chooseOption = () => {
    setCurrentCity(city);

    setSearchInputValue(city.name);
  };

  return (
    <li
      className={"dropdown-item"}
      tabIndex="0"
      onClick={chooseOption}
    >{`${city.name} (${city.country})`}</li>
  );
}

DropdownItem.propTypes = {
  setCurrentCity: PropTypes.func,
  setSearchInputValue: PropTypes.func,
  city: PropTypes.object,
};

export default DropdownItem;
