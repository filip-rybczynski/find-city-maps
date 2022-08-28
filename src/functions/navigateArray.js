const navigateArray = (key, array, currentPointer) => {
// key will be either arrow down or arrow up
  const length = array.length;
  let newPointer;

  if (key === "ArrowDown" || key === 38) {
    newPointer = currentPointer !== null ? (currentPointer + 1) % length : 0;
  }

  if (key === "ArrowUp" || key === 40) {
    newPointer = currentPointer ? currentPointer - 1 : length - 1;
  }

  return newPointer;
};

export default navigateArray;
