import "./App.css";
import React, { useState } from "react";
import CitySelection from "./components/CitySelection/CitySelection";
import Footer from "./components/Footer/Footer";

// import capitalize from "./functions/capitalize";

// import CityDisplay from "./components/CityDisplay/CityDisplay";
// import City from "./components/City";
// import MapDisplay from "./components/MapDisplay/MapDisplay";

function App() {
  // const [cities, setCities] = useState([]); // Let's move this lower
  // const [apiCallsLeft, setApiCallsLeft] = useState(1000); // Also let's move lower
  // const [searchValue, setSearchValue] = useState(""); // Also let's move lower
  const [cityToDisplay, setCityToDisplay] = useState();

  // const fetchOptions = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //     "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
  //   },
  // };

  // const getCities = (e) => {
  //   e.preventDefault();

  //   if (searchValue === "") {
  //     setCities([]);
  //     return;
  //   }
  //   const searchPrefix = capitalize(searchValue);

  //   fetch(
  //     `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`,
  //     fetchOptions
  //   )
  //     .then((response) => {
  //       const callsRemaining = response.headers.get(
  //         "x-ratelimit-requests-remaining"
  //       );
  //       setApiCallsLeft(callsRemaining);
  //       return response.json();
  //     })
  //     .then((response) => {
  //       const cities = response.data.filter((city) => {
  //         return city.type === "CITY" && city.name.startsWith(searchPrefix);
  //       });
  //       setCities(cities);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const handleCitySelection = () => {
  //   setSelectedCityId()
  // }

  return (
    <>
      <h1>City search</h1>
      <CitySelection setCityToDisplay={setCityToDisplay}/>
      {/* <CityDisplay></CityDisplay> */}
      {cityToDisplay && `Name: ${cityToDisplay.name},
      Country: ${cityToDisplay.country}
      Population: ${cityToDisplay.name}`}

      <Footer />
    </>
  );
}

// class App extends React.Component {
//   state = {
//     cities: [],
//     callsRemaining: 0,
//     searchValue: "",
//     chosenCity: "",
//   };

//   fetchOptions = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
//       "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
//     },
//   };

//   fetchTimer;

//   handleCitySearch = (e) => {
//     const searchValue = e.target.value;

//     this.setState({
//       searchValue,
//     });

//     clearTimeout(this.fetchTimer);
//     this.fetchTimer = setTimeout(() => {
//       this.getCities(e);
//     }, 1000);
//   };

//   handleChoice = (e) => {
//     e.preventDefault();

//     const cityAndCountry = this.state.searchValue;

//     const chosenCity = cityAndCountry.split(", ");

//     console.log(chosenCity);

//     this.setState({
//       chosenCity,
//     });
//   };

//   getCities = (e) => {
//     e.preventDefault();

//     const searchValue = capitalize(this.state.searchValue);

//     if (searchValue === "") {
//       this.setState({
//         cities: [],
//       });
//       return;
//     }

//     fetch(
//       `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&namePrefix=${searchValue}`,
//       this.fetchOptions
//     )
//       .then((response) => {
//         const callsRemaining = response.headers.get(
//           "x-ratelimit-requests-remaining"
//         );
//         this.setState({
//           callsRemaining,
//         });
//         return response.json();
//       })
//       .then((response) => {
//         const cities = response.data.filter((city) => {
//           return city.type === "CITY" && city.name.startsWith(searchValue);
//         });
//         this.setState({
//           cities,
//         });
//       })
//       .catch((err) => console.error(err));
//   };

//   render() {
//     const { cities, callsRemaining, searchValue, chosenCity } = this.state;

//     const cityToDisplay = cities.find((city) => {
//       console.log(city, chosenCity, city.name === chosenCity[0]);

//       return city.name === chosenCity[0] && city.country === chosenCity[1];
//     });

//     console.log(cityToDisplay);

//     return (
//       <div className="App">
//         <section className="App-header">
//           <CitySelection
//             searchedName={searchValue}
//             handleCitySearch={this.handleCitySearch}
//             cities={cities}
//             handleChoice={this.handleChoice}
//           ></CitySelection>
//           {cityToDisplay && <City city={cityToDisplay} />}
//           <p>
//             {callsRemaining
//               ? `You have ${callsRemaining} API calls left`
//               : null}
//           </p>
//         </section>
//         <MapDisplay
//           cityName={cities[0].name}
//           cityLocation={[cities[0].longitude, cities[0].latitude]}
//         ></MapDisplay>
//       </div>
//     );
//   }
// }

export default App;
