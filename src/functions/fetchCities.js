import debounce from "../../functions/debounce";

const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
    },
  };

  const fetchCities = (prefix) => {

    console.log(prefix);

    // if (prefix === "") {
    //   setDropdownCities([]);
    //   return;
    // }
    // const searchPrefix = capitalize(prefix);

    // fetch(
    //   `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&limit=10&sort=-population&namePrefix=${searchPrefix}`,
    //   fetchOptions
    // )
    //   .then((response) => {
    //     const callsRemaining = response.headers.get(
    //       "x-ratelimit-requests-remaining"
    //     );
    //     setApiCallsLeft(callsRemaining);
    //     localStorage.setItem(`apiCallsLeftFor${TODAY}`, callsRemaining)
    //     return response.json();
    //   })
    //   .then((response) => {
    //     if (response.data.length === 0) {return}

    //     const cities = response.data.filter((city) => {
    //       return city.type === "CITY" && city.name.startsWith(searchPrefix);
    //     });
    //     setDropdownCities(cities);
    //   })
    //   .catch((err) => console.error(err));
  };

  // const getCities = () => {
  //   console.log('fetchCities');
    
  //   setApiCallsLeft(apiCallsLeft - 1);
  // };

  export default debounce(fetchCities)