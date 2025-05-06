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

  const likesMap = new Map(
    likes.map((entry) => [entry.userId, entry.movies.length]),
  );
  const dislikesMap = new Map(
    dislikes.map((entry) => [entry.userId, entry.movies.length]),
  );

  const dislikedUsers = users.filter((user) => {
    const liked = likesMap.get(user.id) || 0;
    const disliked = dislikesMap.get(user.id) || 0;
    return disliked > liked;
  });

  const subscriptionsPromises = dislikedUsers.map((user) =>
    getUserSubscriptionByUserId(user.id),
  );
  const subscriptions = await Promise.all(subscriptionsPromises);

  const subscriptionsByDislikedUser = subscriptions.map(
    (sub) => sub.subscription,
  );

  return findMajorityElement(subscriptionsByDislikedUser);
};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
