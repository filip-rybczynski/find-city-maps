//! function can also handle hyphenated names, but does not account for exceptions where some words might not need capitalization (e.g. for name with prepositions in them such as Frankfurt am Main)

export default function capitalize(string) {
  
    // Split into separate words (space and hyphens as delimiters)
  const words = string.split(/([\s\-])/g); // includes delimiters in the strings

  return words.map(
    // Capitalize all words - except special cases
    (word) => {
      return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
    }
  ).join(""); // Join again
}
