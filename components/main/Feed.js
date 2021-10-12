import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { useAllPosts } from "../../hooks/Posts";
import { useUser, useAllUsers } from "../../hooks/Users";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    marginTop: 20,
    marginLeft: 15,
    fontStyle: "bold",
  },
});
function Feed() {
  const classes = useStyles();
  const posts = useAllPosts();
  const users = useAllUsers();
  


  return (
    <ScrollView style={styles.root}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => {
          //wie heißt der user der post item gemacht hat?
          const postUserId = item.uid;
          const postUser = users.find((user) => user.uid === postUserId);
          const a = firebase
          .storage()
          .ref('user')
          .listAll()
          .then(snap => {
            snap.items.forEach(itemRef => {
              itemRef.getDownloadURL().then(imgUrl => {
                console.log(imgUrl)
              });
            })
          })
          return (
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                key={item.downloadURL + `?${new Date()}`}
                source={{ uri: item.downloadURL }}
              />
              <View style={styles.container}>
                <Image
                  source={{
                    uri: a.photoURL,
                  }}
                  style={{
                    margin: "10px",
                    width: "60px",
                    height: "60px",
                  }}
                />
               
                <Typography className={classes.text}>
                  {postUser?.name ?? "User not found!"}
                </Typography>
              </View>
              <Text style={styles.containerInfo}>{item.caption}</Text>
              <Divider />
            </View>
          );
        }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  containerInfo: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 20,
  },
  // containerGallery: {
  //   flex: 1,
  // },
  containerImage: {
    marginTop: 15,
    marginBottom: 30,
  },
  image: {
    resizeMode: "cover",
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
});

export default connect(mapStateToProps, null)(Feed);
