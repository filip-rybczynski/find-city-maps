import React, {useState, useEffect} from "react";
import "./nearby-cities.scss";

function NearbyCities({ mainCity, setApiCallsLeft }) {

    const [nearbyCitiesArr, setNearbyCitiesArr] = useState([])

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
    ).then((response) => {
      const callsRemaining = response.headers.get(
        "x-ratelimit-requests-remaining"
      );
      
      setApiCallsLeft(callsRemaining);

      return response.json()
    })
    .then((response) => {
        if (response.data.length === 0) {
            return;
          }

        setNearbyCitiesArr(response.data);
    })
    .catch((err) => {console.log(err)});
  };

  useEffect(() => {

    setTimeout(() => {getNearbyCities(mainCity.id)}, 500);

    return function () {
        setNearbyCitiesArr([]);
    }
  }, [mainCity])

  return (
    <div className={"nearby-cities"}>

          {nearbyCitiesArr.map(city => (

                  <button key={city.id}>
                      {city.name}
                      {city.countryCode !== mainCity.countryCode
                        ? ` (${city.countryCode})`
                        : ''}
                        {console.log(city)}
                      </button>

          ))}

    </div>
  );
}

export default NearbyCities;
