// React
import React, { forwardRef, useState, useEffect } from "react";

// components
import CitySearchDropdown from "../CitySearchDropdown/CitySearchDropdown";

// helper functions
import shortenNames from "../../functions/shortenNames";
import navigateArray from "../../functions/navigateArray";

// styles
import "./city-search.scss";

const CitySearch = forwardRef(
  (
    {
      searchInputValue,
      handleInputChange,
      currentCity,
      selectCity,
      dropdownContent,
      submitError,
    },
    ref
  ) => {
    const [isDropdownHidden, setIsDropdownHidden] = useState(false); // Used to temporarily hide dropdown when user clicks outside of its bounds (or outside of the input). Raised to this component to handle toggling when focusing in/out using tab (onBlur/onFocus is too general)
    const [activeDropdownItem, setActiveDropdownItem] = useState(null); //

    const searchInputId = "city-search";

    useEffect(() => {
      setActiveDropdownItem(null);
    }, [searchInputValue]);

    const handleKeyDown = (e) => {
      const key = e.key || e.keyCode || e.which;

      // Hide dropdown when tabbing out of the input
      // onBlur not used since there are two common scenarios where loss of focus shouldn't hide dropdown
      //  1. When clicking on the dropdown itself
      //  2. When clicking on the Submit button
      if (key === "Tab" || key === 9) setIsDropdownHidden(true);

      if (!Array.isArray(dropdownContent) || dropdownContent.length === 0)
        return; // Nothing to do if there's no array of cities in the dropdown, or if it's empty

      // Handle dropdown item selection if there is an active item (instead of trying to submit with an empty input)
      if (key === "Enter" || key === 13) {
        if (activeDropdownItem !== null) {
          e.preventDefault(); // To avoid form submission through event bubbling
          selectCity(dropdownContent[activeDropdownItem]);
          return;
        }
      }

      if (!["ArrowUp", "ArrowDown", 38, 40].includes(key)) return;
      if (key === "ArrowUp" || key === 38) e.preventDefault(); // to avoid cursor going back to the beginning of the input

      const newActiveItem = navigateArray(
        key,
        dropdownContent,
        activeDropdownItem
      );

      setActiveDropdownItem(newActiveItem);
    };

    const generateDropdownComponent = !currentCity && searchInputValue; // Dropdown should appear if there is no city selected yet (in input), but the user is typing (searchInputValue is not empty)

    return (
      <>
        <span className="labels">
          <label className="labels__main-label" htmlFor="city-search">
            Find a city name
          </label>
          {submitError && (
            <label className="labels__error-label" htmlFor="city-search">
              {submitError}
            </label>
          )}
        </span>
        <span className="city-search">
          <input
            className={"city-search__input"}
            type="search"
            id={searchInputId}
            name="city-search"
            value={searchInputValue}
            placeholder="Start typing to search..."
            ref={ref}
            onChange={handleInputChange}
            onFocus={() => {
              setIsDropdownHidden(false);
            }}
            onKeyDown={handleKeyDown}
          />
          {
            // country tag to clarify which country the city's from
            currentCity && (
              <span className={"city-search__country-tag"}>
                {`(${shortenNames(currentCity.country)})`}
              </span>
            )
          }
          {/* Dropdown */}
          {generateDropdownComponent && (
            <CitySearchDropdown
              selectCity={selectCity}
              dropdownContent={dropdownContent}
              isHidden={isDropdownHidden}
              setIsHidden={setIsDropdownHidden}
              activeDropdownItem={activeDropdownItem}
              inputId={searchInputId}
            />
          )}
        </span>
      </>
    );
  }
);

export default CitySearch;
