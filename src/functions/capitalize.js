export default function capitalize(string) {
    // Split into separate words
  const words = string.split(" ");

  return words.map(
    // Capitalize all words
    (word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
  ).join(" "); // Join again
}
