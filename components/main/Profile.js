import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
// MATERIAL UI
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
//FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useUser, useUserRole } from "../../hooks/Users";
import { db } from "../../firebase";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  input,
  label,
  IconButton,
} from "@material-ui/core";
import { ScrollView } from "react-native-gesture-handler";

function Profile(props, navigation) {
  const classes = useStyles();
  const user = useUser(firebase.auth().currentUser.uid);
  const [time, setTime] = useState("7:30");
  const [timing, setTiming] = useState([]);
  const [timeAfternoon, setTimeAfternoon] = useState("7:30");
  const [timingAfternoon, setTimingAfternoon] = useState([]);
  const [sickDaysStart, setSickDaysStart] = useState(Date.now());
  const [sickDaysEnd, setSickDaysEnd] = useState(Date.now());
  const [sickDaysConfirm, setSickDaysConfirm] = useState([]);
  const [downloadURL, setDownloadURL] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    firebase.auth().currentUser.photoURL
  );
  console.log(user);

  const onLogout = () => {
    firebase.auth().signOut();
  };

  function handelSickDaysStart(e) {
    setSickDaysStart(e.target.value);
  }
  function handelSickDaysEnd(e) {
    setSickDaysEnd(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }
  function handleTimeAfternoon(e) {
    setTimeAfternoon(e.target.value);
  }
  function delayMorning() {
    console.log(time);
    setTiming([...timing, { time }]);
    db.collection("delayInTheMorning")
      .doc()
      .set({
        time,
        user,
        uid: props.route.params.uid,
      })
      .then(() => {
        //If you wish to push the written data to your local state, you can do it here
        setTiming([...timing, { time }]);
        console.log("Documents saved succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchTimeEntries() {
    firebase
      .firestore()
      .collection("delayInTheMorning")
      .get()
      .then((snapshot) => {
        let loadedPosts = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return doc.data();
        });
        setTiming(loadedPosts);
      });
  }

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  function delayAfternoon() {
    db.collection("delayInTheAfternoon")
      .doc()
      .set({
        timeAfternoon,
        user
      })
      .then(() => {
        //If you wish to push the written data to your local state, you can do it here
        setTimingAfternoon([...timingAfternoon, { timeAfternoon }]);
        console.log("Documents saved succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchTimeAfternoonEntries() {
    firebase
      .firestore()
      .collection("delayInTheAfternoon")
      .get()
      .then((snapshot) => {
        let loadedPosts = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return doc.data();
        });
        setTimingAfternoon(loadedPosts);
      });
  }

  useEffect(() => {
    fetchTimeAfternoonEntries();
  }, []);

  function sickDaysStartEnd() {
    db.collection("DaysofSickness")
      .doc()
      .set({
        sickDaysStart,
        sickDaysEnd,
        user,
      })
      .then(() => {
        //If you wish to push the written data to your local state, you can do it here
        setSickDaysConfirm([
          ...sickDaysConfirm,
          { sickDaysStart, sickDaysEnd },
        ]);
        console.log("Documents saved succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchSickDaysEntries() {
    firebase
      .firestore()
      .collection("DaysofSickness")
      .get()
      .then((snapshot) => {
        let loadedPosts = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return doc.data();
        });
        setSickDaysConfirm(loadedPosts);
      });
  }

  useEffect(() => {
    fetchSickDaysEntries();
  }, []);

  function isCurrentUserProfile() {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      return true;
    } else {
      return false;
    }
  }
  async function handleFileInputChange(e) {
    const files = e.target.files;
    const file = files[0];

    const storage = firebase.storage();
    const usersImageRef = storage
      .ref()
      .child(`users/${user.uid}/profilepicture.jpg`);

    const snap = await usersImageRef.put(file);

    const downloadURL = await snap.ref.getDownloadURL();
    setDownloadURL(downloadURL);

    // db.collection("users").doc("users").update({
    //   photoURL: downloadURL
    // }).then(function() {
    //   console.log("Frank food updated");
    // });
    // Hier photoUrl in der user collection speichern
    // -> {name : "...", email : "...", role : "...", photoUrl : "..."}

    await firebase
      .auth()
      .currentUser.updateProfile({ photoURL: downloadURL })
      .then(() => {
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            photoURL: downloadURL,
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setProfilePictureUrl(downloadURL);
  }
  if (user === null) {
    return <div className={classes.root} />;
  }
  return (
    <ScrollView style={styles.root}>
      <Container className={classes.div}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileInputChange}
        />
        <label>
          <IconButton>
            <Image
              source={{
                uri: profilePictureUrl,
              }}
              style={{
                marginTop: "10px",
                width: "100px",
                height: "100px",
                borderRadius: "60px",
              }}
            />
          </IconButton>
        </label>
        <Typography className={classes.text}> {user.name} </Typography>
        <Typography className={classes.text}> {user.email} </Typography>

        {isCurrentUserProfile() ? (
          <Button
            className={classes.btn}
            size="large"
            variant="outlined"
            onClick={() => onLogout()}
          >
            Logout
          </Button>
        ) : null}
      </Container>

      {user?.role === "parent" && (
        <Card className={classes.div}>
          {/* //Verspätung */}
          <CardContent className={classes.cardBackGround}>
            <Typography variant="h5" className={classes.cardTyp}>
              {" "}
              Verspätung{" "}
            </Typography>
            <Container className={classes.cardContainer}>
              <TextField
                id="time"
                label="Zeit"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={(value) => {
                  handleTime(value);
                }}
              />
              <Button
                className={classes.cardBtn}
                onClick={() => delayMorning()}
              >
                Absenden
              </Button>
            </Container>
          </CardContent>

          {/* //Krankenmledungen */}
          <CardContent className={classes.cardBackGround}>
            <Typography variant="h5" className={classes.cardTyp}>
              Krankenmledungen
            </Typography>
            <Container className={classes.cardContainer}>
              <TextField
                id="date"
                label="Von"
                type="date"
                defaultValue="2021-09-14"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(value) => {
                  handelSickDaysStart(value);
                }}
              />

              <TextField
                id="date"
                label="bis"
                type="date"
                defaultValue="2021-09-20"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(value) => {
                  handelSickDaysEnd(value);
                }}
              />
            </Container>
            <Button
              className={classes.cardBtnKM}
              onClick={() => sickDaysStartEnd()}
            >
              Absenden
            </Button>
          </CardContent>

          {/* //Verspätung Abolung*/}
          <CardContent className={classes.cardBackGround}>
            <Typography variant="h5" className={classes.cardTyp}>
              {" "}
              Verspätung Abholung
            </Typography>
            <Container className={classes.cardContainer}>
              <TextField
                id="time"
                label="Zeit"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={(value) => {
                  handleTimeAfternoon(value);
                }}
              />
              <Button
                className={classes.cardBtn}
                onClick={() => delayAfternoon()}
              >
                Absenden
              </Button>
            </Container>
          </CardContent>
        </Card>
      )}

      {/* <List> */}
      {/* Verspätungs Liste */}
      {user?.role === "pädagoge" && <>       
      {timing.map((item) => {
        return (
          <List className={classes.lists}>
            <ListItem className={classes.list1}>
              <ListItemText
                primary={item.user?.name ?? user.name}
                secondary={`Verspätung in der Früh ${item.time}`}
              />
            </ListItem>
          </List>
        );
      })}</>  }
         {/* Verspätungs Nachmittag */}
      {user?.role === "pädagoge" && <>  
      {timingAfternoon.map((item) => {
        return (
          <List className={classes.lists}>
            <ListItem className={classes.list}>
              <ListItemText
                primary={item.user?.name ?? user.name}
                secondary={`Verspätung bei der Abholung ${item.timeAfternoon}`}
              />
            </ListItem>
          </List>
        );
      })}</> }
         {/* Krankmeldung */}
      {user?.role === "pädagoge" && <>  
      {sickDaysConfirm.map((item) => {
        return (
          <List className={classes.lists}>
            <ListItem className={classes.list}>
              <ListItemText
                primary={item.user?.name ?? user.name}
                secondary={`Krankmeldung von ${item.sickDaysStart} bis ${item.sickDaysEnd}`}
              />
            </ListItem>
          </List>
        );
      })}</> }
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps, null)(Profile);

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
  },
  div: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
  },
  list1: {
    marginTop: 20,
    backgroundColor: "#D7E0DB",
  },
  list: {
    marginTop: 10,
    backgroundColor: "#D7E0DB",
  },
  lists: {
    marginLeft: 15,
    marginRight: 15,
    borderRadius: "30%",
  },
  avatar: {
    marginBottom: 10,
  },
  btn: {
    marginTop: 10,
    width: 250,
    marginBottom: 30,
  },
  text: {
    fontSize: 25,
    marginTop: 10,
  },
  cardTyp: {
    textAlign: "left",
    paddingLeft: 13,
  },
  cardBtn: {
    marginTop: 20,
    marginLeft: 30,
  },
  cardBtnKM: {
    marginTop: 20,
    marginLeft: 10,
  },
  cardContainer: {
    display: "flex",
  },
  cardBackGround: {
    backgroundColor: "#D7E0DB",
  },
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
  },
});
