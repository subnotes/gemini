/**
 * Helper Functions for Templates
 */

// import node packages

// import local files

// Interface/Helper Functions
function getRandomInt(min, max) {
  if (min == max)
    return min;
  else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = {
  getRandomInt: getRandomInt,
}
