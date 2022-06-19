// Declaring fetch options, which in this project will always be the same for this function
// Always available for the function thanks to closure

const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
  },
};

const fetchGeoDBdata = async (url, nameStartsWith = "") => {
  // 1. Initialize the fetchedData object
  const fetchedData = {
    apiCallsLeft: 1000,
    cities: null,
  };

  // 2. Fetch required data from the API
  return await fetch(url, FETCH_OPTIONS)
    .then((response) => {
      // 2.a Save number of remaining calls from response headers before calling .json()
      const callsRemaining = response.headers.get(
        "x-ratelimit-requests-remaining"
      );

      fetchedData.apiCallsLeft = callsRemaining;

      return response.json();
    })
    .then((response) => {
      // 2.b Operations on received data

      // If no data in array (i.e. no cities meet the parameters given in the URL), return fetchData object as is (so with cities === null)
      if (response.data.length === 0) {
        return fetchedData;
      }

      // If there are results:
      const cities = response.data
        .filter((city) => {
          // filter by city type and name prefix (if provided - prefix given in URL includes cities where prefix matches the start of any word in the name (and not only the very beginning))
          return city.type === "CITY" && city.name.startsWith(nameStartsWith);
        })
        .sort((cityA, cityB) => cityA.name.localeCompare(cityB.name)); // Sort alphabetically

      // * Alphabetical sorting by name could also be done via the URL (API gives this option), but since there is a 10 result limit for fetched results in the free plan, I want to use the URL to sort by population (to get the largest cities) and then sort alphabetically in the fetching function.

      if (cities.length !== 0) {
        // If not empty after filtering, assign the data to the fetchedData object property
        fetchedData.cities = cities;
      }

      // return object with obtained information
      return fetchedData;
    })
    .catch((err) => console.error(err));
};

export default fetchGeoDBdata;
