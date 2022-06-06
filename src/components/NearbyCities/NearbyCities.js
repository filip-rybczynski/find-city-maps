import React, { useState, useEffect } from "react";
import "./nearby-cities.scss";

function NearbyCities({ mainCity, setApiCallsLeft, setCityToDisplay,setNearbyCity, nearbyCity }) {
  const [nearbyCitiesArr, setNearbyCitiesArr] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  const getNearbyCities = (id) => {
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}/nearbyCities?limit=10&radius=100&minPopulation=100000&types=CITY&sort=-population`,
      fetchOptions
    )
      .then((response) => {
        const callsRemaining = response.headers.get(
          "x-ratelimit-requests-remaining"
        );

        setApiCallsLeft(callsRemaining);

        return response.json();
      })
      .then((response) => {

        const data = response.data;

        if (data.length === 0) {
          return;
        }
        
        setNearbyCitiesArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e, city) => {
    e.preventDefault();

    if (activeButton !== city.id) {
      setActiveButton(city.id);
      setNearbyCity(city);
    } else {
      setActiveButton(null);
      setNearbyCity(null);

    }
  };

  useEffect(() => {
    setTimeout(() => {
      getNearbyCities(mainCity.id);
    }, 500);

    return function () {
      setNearbyCitiesArr([]);
    };
  }, [mainCity]);

  return (
    <div className={"nearby-cities"}>
      <div className={"nearby-cities__buttons"}>
        {nearbyCitiesArr.map((city) => (
          <button
            key={city.id}
            onClick={(e) => handleClick(e, city)}
            className={`nearby-cities__button ${
              city.id === activeButton ? "active" : ""
            }`}
          >
            {/* using closure with 'city' in handleClick */}
            {city.name}
            {city.countryCode !== mainCity.countryCode
              ? ` (${city.countryCode})`
              : ""}
          </button>
        ))}
      </div>
      <div className="nearby-cities__info">
        {!nearbyCity ? (
          ""
        ) : (
          <>
          <table className="nearby-cities__table">
            <tr>
              <td>Name</td>
              <td>{nearbyCity.name}</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>{nearbyCity.region}</td>
            </tr>
            <tr>
              <td>Population</td>
              <td>{nearbyCity.population}</td>
            </tr>
            <tr>
              <td>Distance (km)</td>
              <td>{nearbyCity.distance * 1.608}</td>
            </tr>
          </table>
          <button onClick={()=>{setCityToDisplay(nearbyCity); setNearbyCity(null)}}>Set as main city</button>
          </>
        )}
      </div>
    </div>
  );
}

export default NearbyCities;
