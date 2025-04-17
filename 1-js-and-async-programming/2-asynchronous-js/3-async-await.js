/*

  Challenge 3: Most Common Subscription for Harsh Reviewers

  Find the most common subscription among users who dislike more movies than they like.
  Use the methods in utils/mocked-api to get user and rating data.
  Check each user's likes vs. dislikes, filter those with more dislikes, and return the most frequent subscription.

  Requesites:
    - Use await with the methods from utils/mocked-api to get the data
    - Make sure to return a string containing the name of the most common subscription
*/

import {
  getUsers,
  getLikedMovies,
  getDislikedMovies,
  getUserSubscriptionByUserId,
} from "./utils/mocked-api.js";
import findMajorityElement from "../1-javascript-fundamentals/5-find-majority-element.js";

/**
 * Logs the most common subscription among users
 * who disliked more movies than they liked.
 *
 * @returns {Promise<string>} Logs the subscription name as a string.
 */
const getCommonDislikedSubscription = async () => {
  const users = await getUsers();
  const likes = await getLikedMovies();
  const dislikes = await getDislikedMovies();
  const subscriptionsByDislikedUser = [];

  const dislikedUsers = users.filter((user) => {
    const liked =
      likes.find((entry) => entry.userId === user.id)?.movies.length || 0;
    const disliked =
      dislikes.find((entry) => entry.userId === user.id)?.movies.length || 0;
    return disliked > liked;
  });

  for (const user of dislikedUsers) {
    const userSubscription = await getUserSubscriptionByUserId(user.id);
    subscriptionsByDislikedUser.push(userSubscription.subscription);
  }

  return findMajorityElement(subscriptionsByDislikedUser);
};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
