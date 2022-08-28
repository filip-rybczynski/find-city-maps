const setToNull = (...fns) => {
    fns.forEach(fn => fn(null));
}

export default setToNull;