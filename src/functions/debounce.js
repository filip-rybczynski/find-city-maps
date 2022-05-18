function debounce(fn, timeout = 1000) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(()=>{fn(...args)}, timeout);

  };
}

export default debounce;