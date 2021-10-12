import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function Landing({ navigation }) {
  const classes = useStyles();
  return (
    <View style={styles.root}>
      <View>
        <Image style={styles.image} source={require("../../assets/2-1.png")} />
      </View>
      <View style={styles.container}>
        <Button
          label="Register"
          variant="outlined"
          className={classes.btn}
          onClick={() => navigation.navigate("Register")}
        >
          Register
        </Button>
      </View>

      <View style={styles.container}>
        <Button
          label="Login"
          variant="outlined"
          className={classes.btn}
          onClick={() => navigation.navigate("Login")}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#708E7C",
  },
  image: {
    width: 230,
    height: 180,
    marginBottom: 5,
    marginLeft: 70,
    marginTop: 250,
  },
  container: {
    justifyContent: "center",
    marginLeft: 110,
    width: 150,
    marginBottom: 15,
  },
});

const useStyles = makeStyles({
  btn: {
    color: "white",
    borderColor: "white",
  },
});
