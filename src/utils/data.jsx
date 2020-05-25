import { getUser } from "./auth";
import firebase from "gatsby-plugin-firebase";

export const saveData = (data) => {
  console.log("Save firebase: ", firebase);
  console.log("Save data: ", data);

  let user = getUser();

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
    .then((result) => (data = result.data()));

  return data;
};

export const getTasks = async () => {
  let data = {};

  let tasks = JSON.parse(window.localStorage.getItem("tasks"));

  if (tasks !== undefined) {
    console.log("Did not get from server");
    data = tasks;
    return tasks;
  }

  await firebase
    .firestore()
    .collection("tasks")
    .doc("summer-health-challenge")
    .get()
    .then((result) => (data = result.data().tasks));

  window.localStorage.setItem("tasks", JSON.stringify(data));

  return data;
};
