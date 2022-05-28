import React from "react";

import PropTypes from "prop-types";

import "./dropdown-item.scss";

function DropdownItem({ setCurrentCity, setSearchValue, city }) {
  const chooseOption = () => {
    setCurrentCity(city);

    setSearchValue(city.name);
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
  setSearchValue: PropTypes.func,
  city: PropTypes.object,
};

export default DropdownItem;
