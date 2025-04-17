/*
Challenge 1

"Time difference calculator"

The function timeDifference accepts two positive numbers representing time in seconds. You should modify the function to return the difference between the two times in a human-readable format HH:MM:SS.

Requirements:
- The function should accept two positive numbers representing time in seconds.
- The function should return the absolute difference between the two times.
- The result should be formatted as HH:MM:SS.

Example:

timeDifference(7200, 3400); // Expected output: "01:03:20"

*/

const timeDifference = (a, b) => {
  const diff = Math.abs(a - b);
  calculateHours = Math.floor(diff / 3600).toString();
  calculateMinutes = Math.floor((diff % 3600) / 60).toString();
  calculateSeconds = Math.floor(diff % 60).toString();

  if (Number(calculateHours) < 10) {
    calculateHours = `0${calculateHours}`;
  }

  if (Number(calculateMinutes) < 10) {
    calculateMinutes = `0${calculateMinutes}`;
  }

  if (Number(calculateSeconds) < 10) {
    calculateSeconds = `0${calculateSeconds}`;
  }

  return `${calculateHours.toString()}:${calculateMinutes.toString()}:${calculateSeconds.toString()}`;
};

module.exports = timeDifference;
