import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export function useUser(uid) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log("does not exist");
        }
      });
  }, [uid]);

  return user;
}

export function useAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollected = [];
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          usersCollected.push({
            ...doc.data(),
            uid: doc.id,
          });
        });
        setUsers(usersCollected);
        console.log(usersCollected);
      });
  }, []);
  return users;
}




