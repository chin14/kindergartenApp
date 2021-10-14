import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Checkbox, Container, Slide } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { useUser } from "../../hooks/Users";

function DateAndTimePickers(props) {
  const user = useUser(firebase.auth().currentUser.uid);
  const classes = useStyles();
  const [ort, setOrt] = useState("");
  const [notiz, setNotiz] = useState("");
  const [hinweis, setHinweis] = useState("");
  const [eintragen, setEintragen] = useState([]);
  const [dateandtime, setDateandtime] = useState([]);

  function handelDateandTime(e) {
    setDateandtime(e.target.value);
  }
  function handelOrt(e) {
    setOrt(e.target.value);
  }
  function handelNotiz(e) {
    setNotiz(e.target.value);
  }
  function handelHinweis(e) {
    setHinweis(e.target.value);
  }
  function KalenderEintrag() {
    db.collection("eintrag")
      .doc()
      .set({
        ort,
        notiz,
        hinweis,
        dateandtime,
      })
      .then(() => {
        setEintragen([...eintragen, { ort, notiz, hinweis, dateandtime }]);
        console.log("Documents saved succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchKalendareintrag() {
    firebase
      .firestore()
      .collection("eintrag")
      .get()
      .then((snapshot) => {
        let loadedIfnos = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return doc.data();
        });
        setEintragen(loadedIfnos);
      });
  }

  useEffect(() => {
    fetchKalendareintrag();
  }, []);

  return (
    <ScrollView style={styles.root}>
      {user?.role === "pädagoge" && (
        <>
          <Container>
            <TextField
              id="datetime-local"
              label="Neues Ereigniss"
              type="datetime-local"
              defaultValue="2021-09-16T10:30"
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(value) => {
                handelDateandTime(value);
              }}
            />
          </Container>
          {/* ORT */}
          <Container className={classes.ortContainer}>
            <TextField
              id="standard-helperText"
              label="Ort"
              defaultValue="Text"
              onChange={(value) => {
                handelOrt(value);
              }}
            />
          </Container>
          {/* Hinweis */}
          <Container className={classes.ortContainer}>
            <TextField
              id="standard-helperText"
              label="Hinweis"
              defaultValue="Text"
              onChange={(value) => {
                handelHinweis(value);
              }}
            />
          </Container>
          {/* Notizen */}
          <Container className={classes.ortContainer}>
            <TextField
              id="standard-helperText"
              label="Notizen"
              defaultValue="Text"
              onChange={(value) => {
                handelNotiz(value);
              }}
            />
          </Container>
       
    

      <Container>
        <Button
          onClick={() => KalenderEintrag()}
          className={classes.btn}
          variant="outlined"
        >
          Absenden
        </Button>
      </Container>
      </>  )}

      {/* Kalender einträge  */}
      {/* Kalender einträge  */}
      {eintragen.map((item) => {
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {item.ort}
              </Typography>
              <Typography variant="h5" component="h2">
                {item.hinweis}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {item.notiz}
              </Typography>
              <Typography variant="body2" component="p">
                {item.dateandtime}
                <br />
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  eintrag: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(DateAndTimePickers);

//material UI style
const useStyles = makeStyles({
  root: {
    marginTop: 30,
    marginLeft: 16,
  },
  card: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    marginTop: 30,
  },
  ortContainer: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  btn: {
    marginTop: 20,
    marginLeft: 15,
  },
});

//React native style
const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
  },
});
