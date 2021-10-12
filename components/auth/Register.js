import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { Button, Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  box: {
    marginLeft: 16,
    color: "white",
  },
  boxText: {
    color: "white",
  },
  btn: {
    marginLeft: 13,
    marginRight: 13,
    borderColor: "white",
    color: "white",
    borderRadius: 30,
    marginTop: 20,
  },
});
const Register = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  function onSignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            role: isTeacher ? "pädagoge" : "parent",
            photoURL: null,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="name"
        onChangeText={(name) => setName(name)}
      />

      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <FormControlLabel
        label="Ich bin Pädagoge"
        className={classes.boxText}
        control={
          <Checkbox
            className={classes.box}
            value={isTeacher}
            onChange={setIsTeacher}
          />
        }
      />

      <Button
        className={classes.btn}
        onClick={onSignUp}
        size="medium"
        variant="outlined"
      >
        On Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#708E7C",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
    placeholderTextColor: "white",
  },
});

export default Register;
