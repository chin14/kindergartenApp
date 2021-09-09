import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
// MATERIAL UI
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

//FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../../hooks/Users";
import { MorningDelay } from "../../hooks/DayandTime";

function Profile(props) {
  const classes = useStyles();
  const user = useUser(props.route.params.uid);
  const delay = MorningDelay(props.timing);
  
  const onLogout = () => {
    firebase.auth().signOut();
  };


  function isCurrentUserProfile() {
    if(props.route.params.uid === firebase.auth().currentUser.uid) {
      return true;
    } else {
      return false;
    }
  }

 

  if (user === null) {
    return <div className={classes.root} />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.div}>
        <Container>
          <Avatar alt="Ana Pädagogin" className={classes.avatar} />
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
        <Card>
          {/* //Verspätung */}
          <CardContent>
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
                onChange={(event) => {
                  delay.timing;
                }}
                
              />
              <Button className={classes.cardBtn} onClick={() => delay.timing}>Absenden</Button>
            </Container>
          </CardContent>

          {/* //Krankenmledungen */}
          <CardContent className={classes.cardKrankmeldung}>
            <Typography variant="h5" className={classes.cardTyp}>
              {" "}
              Krankenmledungen{" "}
            </Typography>
            <Container className={classes.cardContainer}>
              <TextField
                id="date"
                label="Von"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="date"
                label="bis"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Container>
            <Button className={classes.cardBtnKM}>Absenden</Button>
          </CardContent>

          {/* //Verspätung Abolung*/}
          <CardContent>
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
              />
              <Button className={classes.cardBtn}>Absenden</Button>
            </Container>
          </CardContent>
        </Card>
      </div>
    </div>
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
});
