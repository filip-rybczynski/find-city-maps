# Find city maps 🏙🗺

A simple app which can be used to display maps of selected cities. App also allows to view nearby cities of any chosen city, if there are any in the nearest vicinity.

## Main stuff I learned 🤓📝

- fetching data from an API
- Basics of React hooks
- Interacting with Open Layers
- Basics of using mixins (with variables) in SCSS

## Potential areas for future improvements/upgrades 🤔📈

- better accessibility
- adding animations to the Open Layers map changes
- converting to TypeScript
- Implementing state management
- further breaking down/simplifying some large components

## Limitations 😕🛑

- Free version of the API used had a limit on the number of cities that could be provided per API call (10). As a result, not all relevant results may be shown in the dropdown. Cities are sorted by population.
- There is a limit for daily calls - API calls left is shown in the app
- The API also includes counties which are not technically cities, so the limited results still need to be filtered. Potentially, all 10 results could be filtered out if they're first in sorting order, causing no relevant cities to show
- The API treats districts as cities, so for large cities all nearby cities might be its districts`npm start`
- Open Street Maps have city names in local languages, so there can be a mismatch between the name displayed in the app (which comes from the GeoDB API) and the name visible on the map

## Additional information ℹ👨‍💻

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`npm start` can be ran to run the app in development mode. Other standard Create React App scripts also work normally.
