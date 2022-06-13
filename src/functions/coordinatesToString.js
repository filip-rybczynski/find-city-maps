function coordinatesToString(latitude, longitude) {
    const roundCoord = (coord) => {
        return Math.abs(coord).toFixed(3).toString();
    }

  const latitudeDirection = latitude >= 0 ? "N" : "S";
  const longitudeDirection = longitude >= 0 ? "E" : "W";

  return `${roundCoord(latitude)}° ${latitudeDirection}, ${roundCoord(longitude)}° ${longitudeDirection}`;
}

export default coordinatesToString;