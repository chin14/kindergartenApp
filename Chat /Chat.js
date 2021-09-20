import { makeStyles, Snackbar, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-rainbow-components";
import { db, auth } from "../firebase";
import { user } from "../redux/reducers/user";
import SendMessages from "./SendMessages";
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser,useAllUsers } from "../hooks/Users";

export default function Chat({navigation}) {
  const classes = useStyles();
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const users = useAllUsers();

  useEffect(() => {
    console.log("In use effect");
    db.collection("messages")
      .orderBy("createdAt")
      .limit(60)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <ScrollView style={styles.root}>
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid }) => {
          const isIncoming = uid !== auth.currentUser.uid;
          let name = "";
          let role = "";
          if(users) {
              name = users.find((user) => user.uid === uid).name
              role = users.find((user) => user.uid === uid).role
          }
          return (
            <div
              key={id}
              style={
                isIncoming
                  ? {
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                     
                    }
                  : {
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }
              }
            >
              <div style={{
                  display: "flex",
                  alignItems: isIncoming ? "flex-start" : "flex-end",
                  flexDirection : "column",
                  marginLeft : 20,
                  marginRight : 20
              }}>
                <Avatar src={photoURL} style={{marginTop : 20}}></Avatar>
                <Typography style={{marginTop : 10}} className={classes.message}>{text}</Typography>
                <Typography style={{marginTop : 10}} className={classes.nameText}>{name}</Typography>
                <Typography style={{marginTop : 10}} className={classes.role}>{role}</Typography>
              </div>
            </div>
          );
        })}
      </div>
      <SendMessages scroll={scroll} />
      <div ref={scroll}></div>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    root:{
        backgroundColor: "white",
    },
  received: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  send: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const useStyles = makeStyles({
    nameText:{
        fontSize: 15,
        color: "#D0CCD7",
    },
    role:{
        fontSize: 15,
          color: "#D0CCD7",
    },
    message:{
        backgroundColor: "#D0CCD7",
        width:"100%",
        borderRadius: 30,
        textAlign: "left",
        paddingLeft: 15,
        paddingTop:10,
        paddingBottom: 10,
    }
})