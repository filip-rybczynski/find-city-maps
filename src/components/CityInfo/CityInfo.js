// React
import React from "react";
import PropTypes from "prop-types";

// helper functions
import coordinatesToString from "../../functions/coordinatesToString";

// styles
import "./city-info.scss";

function CityInfo({
  city: { name, country, region, population, longitude, latitude, distance = null },
  headerText, dontShowCountry = false,
}) {
  return (
    <div className="city-info">
      <h3 className="city-info__header">
        {headerText || name}
      </h3>
      <table className="city-info__table">
        <tbody>
          {!dontShowCountry && (
            <tr>
              <td>Country</td>
              <td>{country}</td>
            </tr>
          )}
          <tr>
            <td>Region</td>
            <td>{region}</td>
          </tr>
          <tr>
            <td>Population</td>
            <td>{population.toLocaleString("en-US")}</td>
          </tr>
          <tr>
            <td>Coordinates</td>
            <td>{coordinatesToString(latitude, longitude)}</td>
          </tr>
          {distance && (
            <tr>
              <td>Distance</td>
              <td>{(distance * 1.608).toFixed(2)} km</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CityInfo.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    distance: PropTypes.number,
  }),
  dontShowCountry: PropTypes.bool,
  headerText: PropTypes.string,
};

export default CityInfo;
