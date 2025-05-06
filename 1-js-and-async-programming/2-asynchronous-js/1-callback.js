/*
    Challenge 1: "Make a request with retries"
    
    The function makeRequest under utils/make-requests accepts a number representing the number of attempts to make a request. If the request fails, it should retry up to the specified number of attempts. If all attempts fail, it should return an error message.
    
    Requirements:
    - You should work only within the method in this file
    - The function should accept a number representing the number of attempts.
    - The function should make a request and retry if it fails.
    - If all attempts fail, it should return an error message.
    - The function should not modify the original number of attempts.
    - The function should handle network errors gracefully.
    - The function should not use any external libraries.

    Example:
    makeRequestWithRetries(3); // Expected output: "Request successful on attempt X" or "All attempts failed."


*/

const makeRequest = require("./utils/make-requests");

const makeRequestWithRetries = (attempts) => {
  console.log(`Initializing ${attempts} attempts`);

  let attempt = 1;

  const myCallBack = (error, message) => {
    if (error) {
      console.log("error:", error);
      if (attempt < attempts) {
        attempt++;

        console.log("Starting Attempt:", attempt);

        makeRequest(attempt, myCallBack);
      } else {
        console.log("All attempts failed");
      }
    } else {
      console.log(message);
    }
  };

  makeRequest(attempt, myCallBack);

  // TODO: Implement the function to make a request and retry if it fails
};

makeRequestWithRetries(3);
