import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import firebase from "firebase/app";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btn: {
    marginLeft: 13,
    marginRight: 13,
    borderColor: "white",
    color: "white",
    borderRadius: 30,
    marginTop: 20,
  },
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignUp() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
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
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button
        onClick={onSignUp}
        className={classes.btn}
        size="medium"
        variant="outlined"
      >
        On Sign In
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

export default Login;
