// React
import React from "react";
import PropTypes from "prop-types";

// helper functions
import coordinatesToString from "../../functions/coordinatesToString";

// styles
import "./city-info.scss";

function CityInfo({
  city: { country, region, population, longitude, latitude },
}) {

  return (
    <div className="city-info">
      <table className="city-info__table">
        <tbody>
          <thead>
            <th colspan="2">
              General info
            </th>
          </thead>
          <tr>
            <td>Country</td>
            <td>{country}</td>
          </tr>
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
        </tbody>
      </table>
    </div>
  );
}

CityInfo.propTypes = {
  city: PropTypes.shape({
    country: PropTypes.string,
    region: PropTypes.string,
    population: PropTypes.number,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
};

export default CityInfo;
