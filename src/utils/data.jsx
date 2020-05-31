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

export const getData = async () => {
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
