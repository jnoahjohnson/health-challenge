import { getUser } from "./auth";
import firebase from "gatsby-plugin-firebase";

export const saveData = (data) => {
  let user = getUser();

  window.localStorage.setItem("completed", JSON.stringify(data));

  firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      completedTasks: data,
    })
    .then((ref) => {
      console.log("Saved Data!");
    });
};

export const saveWeight = (data) => {
  let user = getUser();

  window.localStorage.setItem("weight", JSON.stringify(data));

  firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(
      {
        weightData: data,
      },
      { merge: true }
    )
    .then((ref) => {
      console.log("Saved Data!");
    });
};

export const getUserCompleted = async () => {
  let user = getUser();
  let data = {};

  await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((result) => {
      window.localStorage.setItem(
        "completed",
        JSON.stringify(result.data().completedTasks)
      );
      return (data = result.data().completedTasks);
    });

  return data;
};

export const getUserWeightData = async () => {
  let user = getUser();
  let data = {};

  await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((result) => {
      window.localStorage.setItem(
        "weight",
        JSON.stringify(result.data().weightData)
      );
      return (data = result.data().weightData);
    });

  return data;
};

export const getTasks = async () => {
  let data = {};

  await firebase
    .firestore()
    .collection("tasks")
    .doc("summer-health-challenge")
    .get()
    .then((result) => (data = result.data().tasks));

  window.localStorage.setItem("tasks", JSON.stringify(data));

  return data;
};

export const getUserPoints = async () => {
  let user = getUser();
  let points;

  let firebaseData = await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get();

  points = firebaseData.data().totalPoints;

  return points;
};

export const getLeaderboard = async () => {
  let data = await firebase
    .firestore()
    .collection("leaderboard")
    .doc("summer-points")
    .get();

  let leaderboard = data.data().leaderboard;

  if (leaderboard === undefined) {
    return [];
  }

  let points = [];

  leaderboard.forEach((item) => {
    points.push(item.points);
  });

  let sortedLeaderboard = points.sort((a, b) => b - a);

  return sortedLeaderboard;
};
