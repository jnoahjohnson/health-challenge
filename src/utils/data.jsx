import { getUser } from "./auth";

export const saveData = (firebase, data) => {
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
