// React
import React from "react";
import PropTypes from "prop-types";

// styles
import "./dropdown-item.scss";

function DropdownItem({ selectCity, city, active }) {

  const selectThisCity = selectCity.bind(null, city);

  return (
    <li
      className={`dropdown-item ${active && "active"}`}
      onClick={selectThisCity}
    >{`${city.name} (${city.country})`}</li>
  );
}

DropdownItem.propTypes = {
  setCurrentCity: PropTypes.func,
  setSearchInputValue: PropTypes.func,
  city: PropTypes.object,
};

export default DropdownItem;
