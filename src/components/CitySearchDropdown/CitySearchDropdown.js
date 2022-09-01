// React
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// components
import DropdownItem from "../DropdownItem/DropdownItem";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

// styles
import "./city-search-dropdown.scss";

function CitySearchDropdown({
  selectCity,
  dropdownContent,
  isHidden,
  setIsHidden,
  activeDropdownItem,
  inputId,
}) {
  // Effect used to add/remove eventlisteners which handle hiding the dropdown if the user clicks outside of it (or the input, or the submit button)
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

  const handleClickOutside = (e) => {
    // If click is outside of the dropdown OR the input, dropdown should be hidden
    // Dropdown hiding handled using a special "hidden" class (display: none)
    // (Simpler than mounting/unmounting)
    const isOutside =
      !e.target.closest(`[class=dropdown--js]`) && // click not on dropdown
      !e.target.closest(`[id=${inputId}]`) && // click not on input
      !e.target.closest(`[type=submit]`); // click not on submit button of form

    setIsHidden(isOutside); // if click is outside, hide dropdown
  };

  const content =
    dropdownContent && // null if no array or string with error message
    (() => {
      if (typeof dropdownContent === "string") {
        return (
          <span className={"dropdown dropdown--js dropdown__error"}>
            {dropdownContent}
          </span>
        );
      } else if (dropdownContent.length === 0) {
        return (
          <span
            className={`dropdown dropdown__no-results ${isHidden && "hidden"}`}
          >
            Sorry, no results!
          </span>
        );
      } else
        return (
          <ul className={`dropdown dropdown--js ${isHidden && "hidden"}`}>
            {dropdownContent.map((city, index) => (
              <DropdownItem
                key={city.id}
                city={city}
                selectCity={selectCity}
                active={activeDropdownItem === index}
              />
            ))}
          </ul>
        );
    })();

  return (
    content || (
      <span className={`dropdown dropdown--js ${isHidden && "hidden"}`}>
        <LoadingAnimation />
      </span>
    )
  ); // return loading component if dropdownContent is not populated at all (meaning search is in progress - otherwise it would be an array or an error message)
}

CitySearchDropdown.propTypes = {
  dropdownContent: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  selectCity: PropTypes.func,
  isHidden: PropTypes.bool,
  setIsHidden: PropTypes.func,
  activeDropdownItem: PropTypes.number,
  inputId: PropTypes.string,
};

export default CitySearchDropdown;
