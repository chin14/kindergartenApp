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

/*export function useAllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collectionGroup("userPosts")
      .get()
      .then((snapshots) => {
        const postData = snapshots.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setPosts(postData);
      });
  }, []);
  return posts;
}*/
