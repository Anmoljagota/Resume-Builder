export function getWordCount(str?: string) {
  if (!str) return 0;
  // trim leading/trailing whitespace and replace multiple spaces with single space
  var trimmedStr = str.trim().replace(/\s+/g, " ");

  // check if the string is empty after trim
  if (trimmedStr === "") {
    return 0;
  } else {
    // split the string by spaces and count the elements
    return trimmedStr.split(" ").length;
  }
}
