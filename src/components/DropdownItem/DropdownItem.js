// React
import React from "react";
import PropTypes from "prop-types";

// styles
import "./dropdown-item.scss";

function DropdownItem({ setCurrentCity, setSearchInputValue, city }) {
  const chooseListItem = () => {
    setCurrentCity(city);
    setSearchInputValue(city.name);
  };

  return (
    <li
      className={"dropdown-item"}
      tabIndex="0"
      onClick={chooseListItem}
    >{`${city.name} (${city.country})`}</li>
  );
}

DropdownItem.propTypes = {
  setCurrentCity: PropTypes.func,
  setSearchInputValue: PropTypes.func,
  city: PropTypes.object,
};

export default DropdownItem;
