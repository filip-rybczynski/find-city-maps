// Declaring fetch options, which in this project will always be the same for this function
// Always available for the function thanks to closure

const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    "X-RapidAPI-Key": "1be0fcd283msh40b6164f5cd1179p152c73jsn2e00608d4e8e",
  },
};

let retries = 0; // to track number of attempts in case of too many requests per sec (429 errors) - to retry 2 times before returning error message

// Easy way to throttle fetching (limit is 1/sec). API doesn't provide a Retry-After header, so that option is not available. Sleep is sufficient for this simple functionality, as there will be at most 2 fetch requests lined up one after the other.
// https://www.useanvil.com/blog/engineering/throttling-and-consuming-apis-with-429-rate-limits/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchGeoDBdata = async (url, nameStartsWith = "") => {

  // 1. Initialize the fetchedData object
  const fetchedData = {
    apiCallsLeft: 1000,
    cities: null,
    errorMessage: null,
  };

  // 2. Fetch required data from the API

  const response = await fetch(url, FETCH_OPTIONS);

  // Handling bad responses (fetch doesn't automatically reject these statuses)
  if (!response.ok) {
    const { status, statusText } = response;

    // Handling the "too many requests" error specifically
    if (status === 429) {
      retries += 1;
      if (retries < 3) {
        // there will be two attempts
        await sleep(1000); // request limit window for this API (on the free plan) is 1/s according to documentation

        return fetchGeoDBdata(url, nameStartsWith);
      } else {
        retries = 0;
      }
    }

    // Creating error message to return
    fetchedData.errorMessage =
      "Oops, " +
      status.toString() +
      " error" +
      (statusText && `: ${statusText}`) +
      "!";

    // if there is an error, finish function execution (there will be no cities data to process)
    return fetchedData;
  }

  // Reset retries if all goes well
  retries = 0;

  // Update number of API calls left
  fetchedData.apiCallsLeft = +response.headers.get(
    "x-ratelimit-requests-remaining"
  );

  const responseObject = await response.json();

  const cities = responseObject.data
    .filter((city) => {
      // filter by city type and name prefix (if provided - prefix given in URL includes cities where prefix matches the start of any word in the name (and not only the very beginning))
      return city.type === "CITY" && city.name.startsWith(nameStartsWith);
    })
    .sort((cityA, cityB) => cityA.name.localeCompare(cityB.name)); // Sort alphabetically

  // * Alphabetical sorting by name could also be done via the URL (API gives this option), but since there is a 10 result limit for fetched results in the free plan, I want to use the URL to sort by population (to get the largest cities) and then sort alphabetically in the fetching function.

  fetchedData.cities = cities;

  // return object with obtained information
  return fetchedData;
};

export default fetchGeoDBdata;
