// just a little ol' lazy function to shorten some of the very long country names. Nothing special

function shortenNames (countryName) {
    switch (countryName) {
        case "Republic of the Congo":
            return "Congo"
        case "Democratic Republic of the Congo":
            return "Congo (DCR)"
        case "People's Republic of China":
            return "China";
        case "United States of America":
            return "USA";
        default:
            return countryName;
    }
}

export default shortenNames;