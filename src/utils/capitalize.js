export default function capitalize(word) {
  // Convert the first character to uppercase and concatenate it with the rest of the word
  return word?.charAt(0).toUpperCase() + word?.slice(1);
  }

