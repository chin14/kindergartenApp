import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export function useUsersPosts(uid) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let loadedPosts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setPosts(loadedPosts);
      });
  }, [uid]);

  return posts;
}

export function useAllPosts() {
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
}
