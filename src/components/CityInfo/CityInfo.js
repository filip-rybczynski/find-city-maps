import React from "react";
import "./city-info.scss";

function CityInfo({
  city: { country, region, population, longitude, latitude },
}) {
  const coordinatesString = [latitude, longitude]
    .map((value) => parseFloat(value).toFixed(3).toString())
    .join("° N, ");

  return (
    <div className="city-info">
      <table className="city-info__table">
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
          <td>{population}</td>
        </tr>
        <tr>
          <td>Coordinates</td>
          <td>{coordinatesString}</td>
        </tr>
      </table>
    </div>
  );
}

export default CityInfo;
