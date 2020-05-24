import React from "react";
import { useState, useEffect } from "react";
import { useFirebase } from "gatsby-plugin-firebase";

const UserDatabase = () => {
  const [firebase, setFirebase] = useState();

  useFirebase((fb) => {
    setFirebase(fb);
  }, []);

  useEffect(() => {
    if (firebase !== undefined) {
    }
  }, []);

  return <div></div>;
};

export default UserDatabase;
