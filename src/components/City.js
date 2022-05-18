import React from 'react';

function City ({cityData}) {

    console.log(cityData)
    
return (
    <div>
        {cityData.name}, {cityData.country}
<ul>
<li>Population is: {cityData.population}</li>
<li>Latitude: {cityData.latitude}</li>
<li>Longitude: {cityData.longitude}</li>
</ul>
    </div>
)

}

export default City;