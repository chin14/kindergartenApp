import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

export function DayandTime() {
  const [time, setTime] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("delayInTheMorning")
      .get()
      .then((data) => {
        const docs = data.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        })
        setTime(docs);
      });
  }, []);
  return time;
}
